import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";
import Category from "./Category.js";

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  sku: { type: DataTypes.STRING, allowNull: false, unique: true },
  transferPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  qtyInStock: { type: DataTypes.INTEGER, defaultValue: 0 },
  weightGrams: { type: DataTypes.INTEGER, allowNull: true },
  lengthCm: { type: DataTypes.INTEGER },
  widthCm: { type: DataTypes.INTEGER },
  heightCm: { type: DataTypes.INTEGER },
  status: {
    type: DataTypes.ENUM(
      "draft",
      "pending",
      "approved",
      "rejected",
      "inactive"
    ),
    defaultValue: "draft",
  },
  reviewNotes: { type: DataTypes.TEXT },
  suggestedPrice: { type: DataTypes.DECIMAL(10, 2) },
  minPrice: { type: DataTypes.DECIMAL(10, 2) },
  maxPrice: { type: DataTypes.DECIMAL(10, 2) },
});

User.hasMany(Product, { foreignKey: "vendorId", as: "products" });
Product.belongsTo(User, { foreignKey: "vendorId", as: "vendor" });

Category.hasMany(Product, { foreignKey: "categoryId" });
Product.belongsTo(Category, { foreignKey: "categoryId" });

export default Product;
