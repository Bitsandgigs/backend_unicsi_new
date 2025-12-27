

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const GstInvoice = sequelize.define("gst_invoices", {
    invoice_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    invoice_number: {
        type: DataTypes.STRING,
        unique: true,
    },

    invoice_type: {
        type: DataTypes.ENUM(
            "seller_to_customer",
            "supplier_to_seller",
            "platform_to_seller"
        ),
        allowNull: false,
    },

    entity_id: {
        type: DataTypes.UUID, // seller_id / supplier_id / platform_id
        allowNull: false,
    },

    order_id: {
        type: DataTypes.UUID,
        allowNull: true,
    },

    invoice_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    place_of_supply: {
        type: DataTypes.STRING, // State code
        allowNull: false,
    },

    gstin: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    total_taxable_value: DataTypes.FLOAT,
    total_cgst: DataTypes.FLOAT,
    total_sgst: DataTypes.FLOAT,
    total_igst: DataTypes.FLOAT,

    total_invoice_value: DataTypes.FLOAT,

    status: {
        type: DataTypes.ENUM("active", "cancelled"),
        defaultValue: "active",
    },
}, {
    timestamps: true,
    underscored: true,
});
