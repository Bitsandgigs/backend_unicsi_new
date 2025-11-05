import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

/**
 * OTP model stores email verification codes temporarily.
 * Each entry contains:
 * - email: user's email address
 * - otp: 6-digit verification code
 * - expiresAt: when this OTP becomes invalid
 */
const OTP = sequelize.define("OTP", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  otp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

export default OTP;
