const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("../config/cloudinary");

const User = require("../modals/user.modal");
const ExamResult = require("../modals/ExmResult.modal");
const Certificate = require("../modals/Certificate.modal");

const generateCertificateImage = require("../utils/generateCertificateImage");

const { addRowToSheet } = require("../utils/googleSheet.helper");

const generateCertificate = async (req, res) => {
  try {
    const { userId, examId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const result = await ExamResult.findOne({ userId, examId });
    if (!result || result.result !== "pass") {
      return res.status(403).json({ message: "Not eligible" });
    }

    const existing = await Certificate.findOne({ userId, examId });
    if (existing) {
      return res.status(200).json({
        success: true,
        alreadyGenerated: true,
        certificateUrl: existing.certificateUrl,
      });
    }

    const certificateId = "DS-" + uuidv4().slice(0, 8).toUpperCase();

    const imagePath = await generateCertificateImage({
      name: user.name,
      address: user.address || "N/A",
      score: `${result.score} / 50`,
      date: new Date().toLocaleDateString("en-GB"),
      certificateId,
    });

    const uploadRes = await cloudinary.uploader.upload(imagePath, {
      folder: "digital-sakhi-certificates",
    });

    fs.unlinkSync(imagePath);

    await Certificate.create({
      userId,
      examId,
      certificateId,
      certificateUrl: uploadRes.secure_url,
    });

    // 🔹 Google Sheet (SAFE)
    try {
      await addRowToSheet({
        name: user.name,
        phone: user.phone,
        email: user.email,
        address: user.address,
        score: result.score,
        result: "pass",
        certificateUrl: uploadRes.secure_url,
      });
    } catch (sheetErr) {
      console.error("Sheet update failed (certificate):", sheetErr.message);
    }

    return res.status(201).json({
      success: true,
      message: "Certificate generated",
      certificateId,
      certificateUrl: uploadRes.secure_url,
    });

  } catch (err) {
    console.error("certificate error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { generateCertificate };
