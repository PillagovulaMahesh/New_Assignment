// backend/utils/mailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT || 587,
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Send an email
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} html - HTML body content
 */
const sendMail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Student Portal" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });

    console.log(`📧 Email sent: ${info.messageId}`);
    return info;
  } catch (err) {
    console.error('❌ Email send error:', err.message);
    throw err;
  }
};

module.exports = sendMail;
