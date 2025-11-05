import nodemailer from "nodemailer";
import OTP from "../models/OTP.js";
import dotenv from "dotenv";

dotenv.config();

/**
 * Configure the Nodemailer transporter using SMTP credentials
 */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // TLS recommended for port 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
// const transporter = nodemailer.createTransport({
//   service: "gmail", // simpler config
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });

/**
 * Generate and send OTP to user’s email
 * @param {string} email - Email to which OTP should be sent
 */
export const sendOTP = async (email) => {
  // Generate a random 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // OTP expires in 5 minutes
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  // Delete any previous OTP for this email to avoid duplicates
  await OTP.destroy({ where: { email } });

  // Store new OTP in database
  await OTP.create({ email, otp, expiresAt });

  // Email content and configuration
  const mailOptions = {
    from: `"Unicsi Verification" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Email Verification - Unicsi",
    html: `
      <h2>Verify Your Email Address</h2>
      <p>Your OTP for verification is:</p>
      <h1 style="color:#d35400;">${otp}</h1>
      <p>This OTP is valid for 5 minutes.</p>
    `,
  };

  // Send OTP via email
  await transporter.sendMail(mailOptions);
  return otp;
};

/**
 * Verify if provided OTP is valid for given email
 * @param {string} email
 * @param {string} otp
 * @returns {boolean} - true if valid, false if expired or incorrect
 */
export const verifyOTP = async (email, otp) => {
  const record = await OTP.findOne({ where: { email, otp } });
  if (!record) return false; // OTP not found or incorrect

  // Check if OTP expired
  if (record.expiresAt < new Date()) {
    await OTP.destroy({ where: { email } }); // Clean up expired OTP
    return false;
  }

  // Clean up OTP after successful verification
  await OTP.destroy({ where: { email } });
  return true;
};
