import mongoose from 'mongoose';

const ResponseSchema = new mongoose.Schema({
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
    responses: {
        type: Array,
    },
    submittedAt: {
        type: Date
    }
})

export const Response = mongoose.model('Response', ResponseSchema);
