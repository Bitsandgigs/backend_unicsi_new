
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const GstInvoiceItem = sequelize.define("gst_invoice_items", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    invoice_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },

    product_name: DataTypes.STRING,
    hsn_code: DataTypes.STRING,

    quantity: DataTypes.INTEGER,

    taxable_value: DataTypes.FLOAT,

    cgst_rate: DataTypes.FLOAT,
    sgst_rate: DataTypes.FLOAT,
    igst_rate: DataTypes.FLOAT,

    cgst_amount: DataTypes.FLOAT,
    sgst_amount: DataTypes.FLOAT,
    igst_amount: DataTypes.FLOAT,
}, {
    timestamps: false,
    underscored: true,
});
