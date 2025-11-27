// Order.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  status: {
    type: DataTypes.ENUM(
      "created",
      "accepted",
      "packed",
      "shipped",
      "delivered",
      "cancelled",
      "returned"
    ),
    defaultValue: "created",
  },
  subtotal: DataTypes.DECIMAL(10, 2),
  shippingFee: DataTypes.DECIMAL(10, 2),
  platformFee: DataTypes.DECIMAL(10, 2),
  total: DataTypes.DECIMAL(10, 2),
  paymentStatus: {
    type: DataTypes.ENUM("pending", "paid", "refunded"),
    defaultValue: "pending",
  },
  customerName: DataTypes.STRING,
  customerPhone: DataTypes.STRING,
  address1: DataTypes.STRING,
  address2: DataTypes.STRING,
  city: DataTypes.STRING,
  state: DataTypes.STRING,
  pincode: DataTypes.STRING,
  country: DataTypes.STRING,
});

Order.belongsTo(User, { foreignKey: "sellerId", as: "seller" });
Order.belongsTo(User, { foreignKey: "vendorId", as: "vendor" });

export default Order;
