

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const ProductVariant = sequelize.define("product_variants", {
  variant_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  product_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  sku: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  attributes: {
    type: DataTypes.JSONB,
    allowNull: false,
    // { size: "M", color: "Black" }
  },

  weight_grams: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  dimensions_cm: {
    type: DataTypes.JSONB,
    allowNull: true,
    // { l: 10, w: 5, h: 3 }
  },

  hsn_code: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: true,
  underscored: true,
});
