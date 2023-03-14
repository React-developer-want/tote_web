const mongoose = require('mongoose');

const department = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "A department should have a title."]
    },
    url: {
        type: String,
        unique: true
    }
});

module.exports = mongoose.model('departments', department);