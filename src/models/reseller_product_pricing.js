import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const ResellerPricing = sequelize.define("reseller_pricing", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  reseller_id: DataTypes.UUID,
  sku: DataTypes.STRING,

  selling_price: DataTypes.DECIMAL(10, 2),
  margin: DataTypes.DECIMAL(10, 2),
});
