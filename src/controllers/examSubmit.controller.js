const User = require('../modals/user.modal');
const Exam = require('../modals/Exam.modal');
const ExamResult = require('../modals/ExmResult.modal');
const questions = require('../data/questions');

// passing minimam scor
const minScore = 14;


const { addRowToSheet } = require("../utils/googleSheet.helper");

const submitExam = async (req, res) => {
  try {
    const { userId, answers, examId } = req.body;

    if (!userId || !answers || !examId) {
      return res.status(400).json({ message: "UserId, examId and answers are required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const exam = await Exam.findById(examId);
    if (!exam || exam.status === "submited") {
      return res.status(400).json({ message: "Invalid exam or already submitted" });
    }

    let score = 0;
    answers.forEach((ans) => {
      const q = questions.find((q) => q.id === ans.questionId);
      if (q && q.correctAnswer === ans.selectedOption) score++;
    });

    const result = score >= minScore ? "pass" : "fail";

    const examSubmit = await ExamResult.create({
      userId,
      examId,
      score,
      result,
      attemptedExams: user.examAttempts,
      examGiven: user.examGiven,
    });

    user.examAttempts += 1;
    if (result === "pass") user.examGiven = true;
    await user.save();

    exam.status = "submited";
    await exam.save();

    
    return res.status(200).json({
      success: true,
      message: "परीक्षा सफलतापूर्वक सबमिट हो गई है।",
      score,
      result,
      attemptedExams: user.examAttempts,
      examGiven: user.examGiven,
      remainingAttempts: 3 - user.examAttempts,
      submitId: examSubmit._id,
    });

  } catch (error) {
    console.error("submit exam error:", error);
    return res.status(500).json({ message: "Error submitting exam" });
  }
};

module.exports = {
    submitExam
};
