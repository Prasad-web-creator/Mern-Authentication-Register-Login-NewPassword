const nodemailer = require('nodemailer')

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_ADMIN,
        pass: process.env.EMAIL_PASSWORD
      }
    })

    const info = await transporter.sendMail({
      from: `"MERN Auth" <${process.env.EMAIL_ADMIN}>`,
      to,
      subject,
      text
    })

    console.log("✅ Email sent:", info.response)

  } catch (err) {
    console.log("❌ Email error:", err.message)
  }
}

module.exports = sendEmail