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

const Certificate = mongoose.model('Certificate', certificateSchema);

module.exports = Certificate;