import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";


export const SupplierAddress = sequelize.define("supplier_addresses", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  supplier_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  type: {
    type: DataTypes.ENUM("shipping", "return", "billing"),
    allowNull: false,
  },

  address_line1: DataTypes.STRING,
  address_line2: DataTypes.STRING,
  city: DataTypes.STRING,
  state: DataTypes.STRING,
  pincode: DataTypes.STRING,
  country: {
    type: DataTypes.STRING,
    defaultValue: "India",
  },

  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: true,
  underscored: true,
});
