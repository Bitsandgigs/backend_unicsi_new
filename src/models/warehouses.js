

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const Warehouse = sequelize.define("warehouses", {
  warehouse_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  supplier_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  name: DataTypes.STRING,
  city: DataTypes.STRING,
  state: DataTypes.STRING,
  pincode: DataTypes.STRING,
  address: DataTypes.STRING,

  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: true,
  underscored: true,
});
