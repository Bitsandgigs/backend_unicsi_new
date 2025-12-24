


import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const SupplierAuth = sequelize.define("supplier_auth", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  supplier_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  password_hash: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  otp: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  otp_expires_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },

  is_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
  underscored: true,
});
