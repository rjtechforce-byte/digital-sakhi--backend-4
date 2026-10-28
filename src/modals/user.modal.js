const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true,
            length: 10,
            unique: true
        },
        email: {
  type: String,
  required: true,
  unique: true ,
},
        block: {
  type: String,
  required: true
},
        address: {
            type: String,
            required: true,
        },
        
        examGiven: {
            type: Boolean,
            default: false
        },
          examAttempts: {
            type: Number,
            default: 0
        },
    },
    {
        timestamps: true // Automatically adds createdAt and updatedAt fields
    }
);

// Admin panel: block filter + newest-first sort + distinct("block")
userSchema.index({ block: 1, createdAt: -1, _id: -1 });
userSchema.index({ createdAt: -1, _id: -1 });

const User = mongoose.model('User', userSchema);

module.exports = User;
