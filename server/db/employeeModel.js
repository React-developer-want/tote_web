const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name : String,
    email : {
        type : String,
        required : [true, "An user must have an email."],
        unique : true
    },
    password : {
        type: String
    },
    otp: {
        type: String
    },
    phone:{
        type: String
    },
    address:{
        type: String
    },
    role:{
        type: String
    }
});

module.exports = mongoose.model('employees', employeeSchema);