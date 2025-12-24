import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const supplier_bank_details = sequelize.define("supplier_bank_details", {

    supplier_bank_info_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    supplier_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "suppliers",
            key: "supplier_id"
        }
    },
    bank_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    account_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ifsc_code: {
        type: DataTypes.STRING,
        allowNull: false

    },
    branch_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bank_details_status : {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
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