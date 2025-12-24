import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const Order = sequelize.define("orders", {
  order_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  seller_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  marketplace_order_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  order_status: {
    type: DataTypes.ENUM(
      "pending",
      "confirmed",
      "processing",
      "shipped",
      "delivered",
      "cancelled"
    ),
    defaultValue: "pending",
  },

  payment_mode: {
    type: DataTypes.ENUM("prepaid", "cod"),
    allowNull: false,
  },

  total_amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  timestamps: true,
  underscored: true,
});
