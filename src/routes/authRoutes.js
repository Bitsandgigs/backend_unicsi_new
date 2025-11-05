import express from "express";
import {
  signup,
  login,
  sendOtpHandler,
  verifyOtpHandler,
} from "../controllers/authController.js";

const router = express.Router();

/**
 * Route: POST /api/auth/send-otp
 * Purpose: Sends OTP to the provided email
 */
router.post("/send-otp", sendOtpHandler);

/**
 * Route: POST /api/auth/verify-otp
 * Purpose: Verifies OTP before allowing signup
 */
router.post("/verify-otp", verifyOtpHandler);

/**
 * Route: POST /api/auth/signup
 * Purpose: Creates new user after OTP verification
 */
router.post("/signup", signup);

/**
 * Route: POST /api/auth/login
 * Purpose: Authenticates user and returns JWT token
 */
router.post("/login", login);

export default router;
