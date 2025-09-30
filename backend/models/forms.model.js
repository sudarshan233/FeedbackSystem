import mongoose from 'mongoose';

const FormSchema = new mongoose.Schema({
    ownerId:{
        type: String,
        required: true,
        unique: true
    },
    title: String,
    questions: Array,
}, {
    timestamps: true
});

export const Form = mongoose.model('Form', FormSchema);