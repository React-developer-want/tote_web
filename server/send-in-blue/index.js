const axios = require('axios');

const sendMail = async (to, subject, htmlContent) => {
  console.log({ to, subject, htmlContent });
  const data = {
    sender: {
      name: 'Sumit Baghel',
      email: 'sarvgt435216@gmail.com'
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