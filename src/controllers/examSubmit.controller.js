const User = require('../modals/user.modal');
const Exam = require('../modals/Exam.modal');
const ExamResult = require('../modals/ExmResult.modal');
const questions = require('../data/questions');

// passing minimam scor
const minScore = 14;
// Post /api/exam/submit

const submitExam = async (req, res) => {
    try {
        const { userId, answers, examId } = req.body;

        // validation 
        if (!userId || !answers || !examId) {
            return res.status(400).json({ message: 'UserId, examId and answers are required' });
        }

        // is  user exists 
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // is exam submited
        const exam = await Exam.findById(examId);
        
        if (!exam || exam.status === 'submited') {
            return res.status(400).json({ message: 'Invalid exam or exam already submited' });
        }

        // score calculation logic
        let score = 0;
        answers.forEach((ans) => {
           const q = questions.find((q) => q.id === ans.questionId);
           if (q && q.correctAnswer === ans.selectedOption) {
               score += 1;
           }
        });

        const result = (score >= minScore? 'pass' : 'fail');

        // save exam result
       const examSubmit = await ExamResult.create({
            userId,
            examId,
            score,
            result,
            attemptedExams: user.examAttempts,
            examGiven: user.examGiven
        })
      
        // update exam attempts 
        user.examAttempts += 1;
        if (result === 'pass') {
            user.examGiven = true;
        }
        await user.save();

        // update exam status
        exam.status = 'submited';
        await exam.save();


        // response
        res.status(200).json({
            message: 'परीक्षा सफलतापूर्वक सबमिट हो गई है।',
            score,
            result,
            attemptedExams: user.examAttempts,
            examGiven: user.examGiven,
            remainindAttempts: (3 - user.examAttempts),
            id: examSubmit._id
        })
        await addRowToSheet({
          name: user.name,
          phone: user.phone,
          email: user.email,
          address: user.address,
          score,
          result
        });

       
    }  catch (error) {
        console.log('submiting exam error');
        res.status(500).json({ message: 'Error submitting exam', error});
        
    }
}

module.exports = {
    submitExam
};
