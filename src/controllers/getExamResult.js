const ExamResult = require('../modals/ExmResult.modal');

async function getResult  (req, res) {
  try {
    const { submitId } = req.params;
   
   
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
      attemptedExams: submitExam.attemptedExams, // ✅ typo fixed
      result: submitExam.result,
      examGiven: submitExam.examGiven,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error fetching exam result",
    });
  }
};

module.exports = { getResult };
