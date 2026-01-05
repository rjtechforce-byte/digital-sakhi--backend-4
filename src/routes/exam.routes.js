const express = require('express');

const router = express.Router();

const { startExam }  = require('../controllers/exam.controller');
const { getExamQuestions } = require('../controllers/examQuestions.controller');
const { submitExam } = require('../controllers/examSubmit.controller');




// Route to start an exam
router.post('/exam/start', startExam);

// Route to get exam questions
router.get('/exam/questions', getExamQuestions);

// Route to submit an exam
router.post('/exam/submit', submitExam);



module.exports = router;


