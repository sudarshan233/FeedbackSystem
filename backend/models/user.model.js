import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true,
        },
        lastLogin: {
            type: Date,
            default: Date.now()
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        resetPasswordToken: String,
        resetPasswordExpires: Date,
        verificationToken: String,
        verificationExpires: Date,
    }, {
        timestamps: true
});

export const User = mongoose.model('User', UserSchema);