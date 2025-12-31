
import { DataTypes } from "sequelize";
import sequelize  from "../config/database.js";



export const ProductReviewLog = sequelize.define("product_review_logs", {
  log_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  product_id: DataTypes.UUID,
  admin_id: DataTypes.UUID,

  action: {
    type: DataTypes.ENUM("approved", "rejected", "modified"),
  },

  reason: DataTypes.TEXT, // rejection or modification reason
}, {
  timestamps: true,
  underscored: true,
});
