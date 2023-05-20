const nodeMailer = require('nodemailer');
require('dotenv').config();

const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
});

const generateOtp = ()=>{
    return Math.floor(100000 + Math.random() * 900000);
}

module.exports = {transporter, generateOtp};