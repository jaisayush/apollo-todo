import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true,
        enum: ['low', 'medium', 'high', 'critical']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
export const Todos = mongoose.model('Todo', todoSchema);
