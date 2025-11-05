import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendOTP, verifyOTP } from "../services/otpService.js";
import { User } from "../models/User.js";

/**
 * Step 1: Send OTP to a user's email for verification
 */
export const sendOtpHandler = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email using regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Send OTP using service
    await sendOTP(email);

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("OTP Send Error:", error);
    return res.status(500).json({ message: "Failed to send OTP" });
  }
};

/**
 * Step 2: Verify OTP sent to email
 */
export const verifyOtpHandler = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Validate the OTP using service
    const valid = await verifyOTP(email, otp);
    if (!valid) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("OTP Verification Error:", error);
    return res.status(500).json({ message: "Failed to verify OTP" });
  }
};

/**
 * Step 3: User Signup (only after OTP verified)
 */
export const signup = async (req, res) => {
  try {
    const { name, email, password, role, otpVerified } = req.body;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // ✅ Step 1: Check if frontend confirmed OTP verification
    if (!otpVerified) {
      return res
        .status(400)
        .json({ message: "Email not verified or invalid OTP" });
    }

    // ✅ Step 2: Ensure email not already used
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // ✅ Step 3: Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Step 4: Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Step 4: User Login (existing flow)
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user in DB
    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    // Generate JWT Token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
