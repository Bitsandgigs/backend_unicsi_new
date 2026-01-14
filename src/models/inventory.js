

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

  product_id: {
    type: DataTypes.UUID,
    allowNull: true,
  },

  variant_id: {
    type: DataTypes.UUID,
    allowNull: true,
  },

  warehouse_id: {
    type: DataTypes.UUID,
    allowNull: true,
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
