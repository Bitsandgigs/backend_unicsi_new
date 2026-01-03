import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const LedgerEntry = sequelize.define("ledger_entries", {
  ledger_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  reference_type: {
    type: DataTypes.ENUM(
      "order",
      "order_item",
      "payout",
      "refund",
      "rto",
      "commission"
    ),
    allowNull: false,
  },

  reference_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  entity_type: {
    type: DataTypes.ENUM("platform", "supplier", "reseller"),
    allowNull: false,
  },

  entity_id: {
    type: DataTypes.UUID,
    allowNull: true,
  },

  transaction_type: {
    type: DataTypes.ENUM("credit", "debit"),
    allowNull: false,
  },

  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },

  balance_after: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },

  description: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: true,
  underscored: true,
});
