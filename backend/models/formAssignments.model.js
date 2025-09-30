import mongoose from 'mongoose';

const formAssignmentSchema = new mongoose.Schema({
    formId: {
        type: String,
        required: true,
        unique: true
    },
    recipientId: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        required: true,
    },
    sharedAt: {
        type: Date,
        default: Date.now()
    }
})

export const FormAssignment = mongoose.model('FormAssignment', formAssignmentSchema);