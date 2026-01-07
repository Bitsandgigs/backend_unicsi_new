import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const User = sequelize.define("User", {
  user_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("ADMIN", "SUPPLIER", "RESELLER"),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
    allowNull: false,
    defaultValue: "ACTIVE",
  },
});
export default User;
