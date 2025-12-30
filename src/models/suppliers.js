
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const Supplier = sequelize.define("suppliers", {
    supplier_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    name: {
        type: DataTypes.STRING,
    },

    email: {
        type: DataTypes.STRING,
        unique: true,
    },

    number: {
        type: DataTypes.STRING,
        unique: true,
    },

    otp: {
        type: DataTypes.STRING,
    },

    password: {
        type: DataTypes.STRING,
    },

    role: {
        type: DataTypes.ENUM("supplier", "admin"),
        defaultValue: "supplier",
    },

    account_status: {
        type: DataTypes.ENUM("pending", "active", "suspended", "blocked"),
        defaultValue: "pending",
    },
}, {
    timestamps: true,
    underscored: true,
});
