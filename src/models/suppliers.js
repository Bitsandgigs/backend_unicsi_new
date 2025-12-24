
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
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
