// Shipment.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Order from "./Order.js";

const Shipment = sequelize.define("Shipment", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  carrier: DataTypes.STRING,
  trackingNumber: DataTypes.STRING,
  labelUrl: DataTypes.STRING,
  status: {
    type: DataTypes.ENUM(
      "pending",
      "label_created",
      "in_transit",
      "delivered",
      "rto"
    ),
    defaultValue: "pending",
  },
  weightGrams: DataTypes.INTEGER,
});

Order.hasOne(Shipment, {
  foreignKey: "orderId",
  as: "shipment",
  onDelete: "CASCADE",
});
Shipment.belongsTo(Order, { foreignKey: "orderId" });

export default Shipment;
