
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const ReturnInspection = sequelize.define("return_inspections", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    return_item_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },

    inspected_by: {
        type: DataTypes.UUID,
        allowNull: false, // supplier user
    },

    inspection_result: {
        type: DataTypes.ENUM("approved", "rejected"),
        allowNull: false,
    },

    remarks: DataTypes.TEXT,
}, {
    timestamps: true,
    underscored: true,
});
