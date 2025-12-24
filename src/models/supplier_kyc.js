
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";


export const SupplierKyc = sequelize.define("supplier_kyc", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    supplier_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },

    gst_number: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    msme_number: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    gst_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },

    kyc_status: {
        type: DataTypes.ENUM("pending", "approved", "rejected"),
        defaultValue: "pending",
    },
}, {
    timestamps: true,
    underscored: true,
});
