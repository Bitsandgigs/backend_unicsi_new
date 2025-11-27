import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";
import Product from "./Product.js";

const SellerListing = sequelize.define("SellerListing", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  sellingPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
});

User.hasMany(SellerListing, { foreignKey: "sellerId", as: "listings" });
SellerListing.belongsTo(User, { foreignKey: "sellerId", as: "seller" });

Product.hasMany(SellerListing, { foreignKey: "productId" });
SellerListing.belongsTo(Product, { foreignKey: "productId" });

export default SellerListing;
