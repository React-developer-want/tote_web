const nodeMailer = require('nodemailer');
require('dotenv').config();

const transporter = nodeMailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "f6bcc348748433",
      pass: "ed84ea4402ae7d"
    }
});

const generateOtp = ()=>{
    return Math.floor(100000 + Math.random() * 900000);
}

module.exports = {transporter, generateOtp};