

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const SellerLedger = sequelize.define("seller_ledger", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    seller_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },

    order_id: {
        type: DataTypes.UUID,
        allowNull: true,
    },

    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },

    entry_type: {
        type: DataTypes.ENUM("credit", "debit"),
        allowNull: false,
    },

    reason: {
        type: DataTypes.ENUM(
            "order_earning",
            "refund",
            "rto_penalty",
            "platform_fee",
            "adjustment"
        ),
        allowNull: false,
    },
}, {
    timestamps: true,
    underscored: true,
});
