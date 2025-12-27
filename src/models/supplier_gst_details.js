import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const supplier_gst_details = sequelize.define("supplier_gst_details", {
    supplier_gst_info_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    supplier_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    gst_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gst_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gst_validity: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    gst_status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    gst_image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pan_image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pan_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    andhar_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    andhar_image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});
