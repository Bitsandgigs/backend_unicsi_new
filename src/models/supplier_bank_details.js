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
        defaultValue: null
    },
    account_holder_name: {
        type: DataTypes.STRING,
        defaultValue: null
    },

    account_number: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    ifsc_code: {
        type: DataTypes.STRING,
        defaultValue: null

    },
    branch_name: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    bank_details_status : {
        type: DataTypes.BOOLEAN,
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