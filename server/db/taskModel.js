const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        default: Date.now
    },
    due_date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Up Next', 'In Progress', 'Done'],
        default: 'Up Next'
    },
    assigned_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employees'
    },
    assigned_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employees'
    }
}, {
    timestamps: true
});

const Task = mongoose.model("tasks", schema);

module.exports = Task;