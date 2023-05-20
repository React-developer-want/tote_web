const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    sent_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employees'
    },
    sent_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employees'
    }
}, {
    timestamps: true
});

const Report = mongoose.model("report", schema);

module.exports = Report;