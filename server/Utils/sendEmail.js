const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (to, subject, text) => {
  try {
    
    const transporter = nodemailer.createTransport({
      host:'smtp.gmail.com',
      port:587,
      secure:false,
      family: 4,
      requireTLS: true,
      auth:{
        user:process.env.EMAIL_ADMIN,
        pass : process.env.EMAIL_PASSWORD
      }
    })

    const info = await transporter.sendMail({
      from : process.env.EMAIL_ADMIN,
      to:to,
      subject:subject,
      text:text
    })

  } catch (err) {
    console.log("Email error:", err.message)
  }
}

module.exports = sendEmail