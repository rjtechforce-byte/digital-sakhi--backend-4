const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema(
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
    certificateId: {
        type: String,
        required: true,
        unique: true
    },
    issueDate: {
        type: Date,
        default: Date.now
    },
    certificateUrl: {
  type: String,
  required: true,
}

},
{
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Admin panel $lookup (userId) + duplicate check findOne({ userId, examId })
certificateSchema.index({ userId: 1, examId: 1 });

const Certificate = mongoose.model('Certificate', certificateSchema);

module.exports = Certificate;