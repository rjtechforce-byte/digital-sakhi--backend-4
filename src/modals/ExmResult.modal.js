const mongoose = require('mongoose');

const exmResultSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        examId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Exam',
            required: true
        },
        score: {
            type: Number,
            required: true
        },
        result: {
            type: String,
            enum: ['pass', 'fail'],
            requied: true
        },

        examGiven: {
            type: Boolean,
            default: false
        },
      attemptedExams: {
            type: Number,
            default: 0
        }

    },
    {
        timestamps: true // Automatically adds createdAt and updatedAt fields
    }
);

const ExamResult = mongoose.model('ExamResult', exmResultSchema);

module.exports = ExamResult;