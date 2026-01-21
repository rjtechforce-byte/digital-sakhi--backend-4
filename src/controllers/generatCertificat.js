const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("../config/cloudinary");

const User = require("../modals/user.modal");
const ExamResult = require("../modals/ExmResult.modal");
const Certificate = require("../modals/Certificate.modal");

const generateCertificateImage = require("../utils/generateCertificateImage");

const generateCertificate = async (req, res) => {
  try {
    const { userId, examId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const result = await ExamResult.findOne({ userId, examId });
    if (!result || result.result.toLowerCase() !== "pass") {
      return res.status(403).json({ message: "Not eligible" });
    }

    const existing = await Certificate.findOne({ userId, examId });
    if (existing) {
      return res.json({
        message: "Already generated",
        certificateUrl: existing.certificateUrl,
      });
    }

    const certificateId =
      "DS-" + uuidv4().slice(0, 8).toUpperCase();

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
    await addRowToSheet({
      name: user.name,
      phone: user.phone,
      email: user.email,
      address: user.address,
      score: result.score,
      result: "pass",
      certificateUrl: uploadRes.secure_url
    });

    res.status(201).json({
      message: "Certificate generated",
      certificateId,
      certificateUrl: uploadRes.secure_url,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { generateCertificate };
