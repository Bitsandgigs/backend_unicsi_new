
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const Payment = sequelize.define("payments", {
    payment_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    order_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },

    payment_mode: {
        type: DataTypes.ENUM("prepaid", "cod"),
        allowNull: false,
    },

    gateway: {
        type: DataTypes.STRING, // Razorpay, Stripe, Cashfree
        allowNull: true,
    },

    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },

    payment_status: {
        type: DataTypes.ENUM("initiated", "success", "failed", "refunded"),
        defaultValue: "initiated",
    },

    transaction_ref: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: true,
    underscored: true,
});
