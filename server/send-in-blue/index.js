const axios = require('axios');

const sendMail = async (to, subject, htmlContent) => {
  console.log({ to, subject, htmlContent });
  const data = {
    sender: {
      name: 'no reply',
      email: process.env.EMAIL
    },
    to,
    subject,
    htmlContent
  };

  try {
    const response = await axios.post(process.env.SEND_IN_BLUE_URL, data, {
      headers: {
        'Accept': 'application/json',
        'API-Key': process.env.SEND_IN_BLUE_API_KEY,
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { sendMail };