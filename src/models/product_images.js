

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { ProductVariant } from "./product_variants.js";

export const ProductImage = sequelize.define("product_images", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  variant_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: ProductVariant,
      key: "variant_id",
    },
  },

  image_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  sort_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  timestamps: true,
  underscored: true,
});
