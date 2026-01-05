const mongoose = require('mongoose');

const examSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        examStartTime: {
            type: Date,
            required: true
        },
        examEndTime: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: ['submited', 'running'],
            default: 'running',
            required: true
        }
    },
    {
        timestamps: true // Automatically adds createdAt and updatedAt fields
    }
)

module.exports = mongoose.model('Exam', examSchema);