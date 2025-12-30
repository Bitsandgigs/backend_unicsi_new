

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const Inventory = sequelize.define("inventory", {
  inventory_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  sku: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  warehouse_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  available_stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  reserved_stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: true,
  underscored: true,
});
