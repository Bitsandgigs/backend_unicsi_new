import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Product from "./Product.js";

const ProductImage = sequelize.define("ProductImage", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  url: { type: DataTypes.STRING, allowNull: false },
  sortOrder: { type: DataTypes.INTEGER, defaultValue: 0 },
});

Product.hasMany(ProductImage, {
  foreignKey: "productId",
  as: "images",
  onDelete: "CASCADE",
});
ProductImage.belongsTo(Product, { foreignKey: "productId" });

export default ProductImage;
