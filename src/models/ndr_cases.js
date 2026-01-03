import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const NdrCase = sequelize.define("ndr_cases", {
  ndr_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  order_item_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  reason: {
    type: DataTypes.ENUM(
      "customer_not_reachable",
      "address_issue",
      "customer_refused",
      "fake_order",
      "delay",
      "other"
    ),
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM(
      "created",
      "action_pending",
      "reattempt",
      "rto",
      "closed"
    ),
    defaultValue: "created",
  },

  customer_response: {
    type: DataTypes.ENUM("confirmed", "cancelled", "no_response"),
    allowNull: true,
  },

  remarks: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  next_action_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  timestamps: true
});
