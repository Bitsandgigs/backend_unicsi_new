
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";


export const Reseller = sequelize.define("resellers", {
  reseller_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  user_id: DataTypes.UUID,

  status: {
    type: DataTypes.ENUM("active", "blocked"),
    defaultValue: "active",
  },

  rto_score: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});
