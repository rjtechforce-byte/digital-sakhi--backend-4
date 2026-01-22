const ExamResult = require("../modals/ExmResult.modal");
const mongoose = require("mongoose");

async function getResult(req, res) {
  try {
    const { submitId } = req.params;

    // 🔴 Guard 1: submitId missing
    if (!submitId || submitId === "undefined") {
      return res.status(400).json({
        message: "Invalid submitId",
      });
    }

    // 🔴 Guard 2: invalid ObjectId
    if (!mongoose.Types.ObjectId.isValid(submitId)) {
      return res.status(400).json({
        message: "submitId is not a valid ObjectId",
      });
    }

    const submitExam = await ExamResult.findById(submitId);

    if (!submitExam) {
      return res.status(404).json({
        message: "Exam Result not found",
      });
    }

    return res.status(200).json({
      userId: submitExam.userId,
      examId: submitExam.examId,
      score: submitExam.score,
      attemptedExams: submitExam.attemptedExams,
      result: submitExam.result,
      examGiven: submitExam.examGiven,
    });

  } catch (error) {
    console.error("getResult error:", error);
    return res.status(500).json({
      message: "Error fetching exam result",
    });
  }
}

module.exports = { getResult };

