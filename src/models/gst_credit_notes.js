

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const GstCreditNote = sequelize.define("gst_credit_notes", {
    credit_note_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    original_invoice_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },

    credit_note_number: {
        type: DataTypes.STRING,
        unique: true,
    },

    reason: {
        type: DataTypes.ENUM(
            "return",
            "price_difference",
            "tax_correction",
            "order_cancellation"
        ),
        allowNull: false,
    },

    taxable_value: DataTypes.FLOAT,
    cgst_amount: DataTypes.FLOAT,
    sgst_amount: DataTypes.FLOAT,
    igst_amount: DataTypes.FLOAT,

    total_credit_value: DataTypes.FLOAT,

    credit_note_date: DataTypes.DATE,
}, {
    timestamps: true,
    underscored: true,
});
