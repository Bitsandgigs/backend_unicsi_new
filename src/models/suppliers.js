import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const suppliers = sequelize.define("suppliers", {
    supplier_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
    },
    number: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
    },
    otp: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    signup_otp_status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "supplier",
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "active",
    },
    msme_number: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
    },
    gst_number: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
    },
    account_status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "active",
    },
    shipping_address_status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "active",
    },
    return_address_status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "active",
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
})

