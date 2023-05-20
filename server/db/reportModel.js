const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: [ true, "A report must have a title." ]
    },
    description: {
        type: String,
        required: [ true, "A report must have a description." ]
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

const Report = mongoose.model("reports", schema);

module.exports = Report;