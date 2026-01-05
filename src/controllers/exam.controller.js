const Exam = require('../modals/Exam.modal');
const User = require('../modals/user.modal'); 


const MAX_EXAM_ATTEMPTS = 3;
// POST /api/exams/start
const startExam = async (req, res) => {
    try {
        const { userId } = req.body;

        // is user exists
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.examAttempts >= MAX_EXAM_ATTEMPTS) {
            return res.status(403).json({ message: 'आप परीक्षा के लिए अधिकतम प्रयासों (3) की सीमा तक पहुँच चुके हैं। अब आप दोबारा प्रयास नहीं कर सकते।' });
        }

        const runningExam = await Exam.findOne({ userId, status: 'running' });

        if (runningExam) {
            return res.status(400).json({ message: 'An exam is already running for this user' });
        }

        const examStartTime = new Date();
        const examEndTime = new Date(examStartTime.getTime() + 60 * 60 * 1000); // 1 hour later

        const newExam = await Exam.create({
            userId,
            examStartTime,
            examEndTime,
        });

        res.status(201).json({
            message: 'Exam started successfully',
            exam: newExam,
            remainingAttempts: MAX_EXAM_ATTEMPTS - (user.examAttempts + 1)
        });
    } catch (error) {
        console.log('start exam error', error);
        
        res.status(500).json({ message: 'Error starting exam', error});
    }
}

module.exports = {
    startExam
};