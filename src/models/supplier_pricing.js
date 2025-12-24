

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const SupplierPricing = sequelize.define("supplier_pricing", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  sku: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  base_cost: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  min_selling_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  gst_percentage: {
    type: DataTypes.FLOAT,
    defaultValue: 18,
  },
}, {
  timestamps: true,
  underscored: true,
});
