const questions = require('../data/questions');
const { getRandomQuestions} = require('../utils/randomQuestions');


const NUMBER_OF_QUESTIONS = 50;

// GET /api/exam/questions

const getExamQuestions = (req, res) => {
    const selectedQuestions = getRandomQuestions(questions, NUMBER_OF_QUESTIONS);

    const safeQuestions = selectedQuestions.map((q) => (
        {
            id: q.id,
            question: q.question,
            options: q.options,
        }
    ))

    res.status(200).json({
        questions: safeQuestions,
        totalQuestions: safeQuestions.length
    })
}

module.exports = {
    getExamQuestions
};