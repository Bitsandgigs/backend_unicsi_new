import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const Order = sequelize.define("orders", {
    order_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    reseller_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "resellers",
            key: "reseller_id",
        },
    },

    customer_name: DataTypes.STRING,
    customer_phone: DataTypes.STRING,
    shipping_address: DataTypes.TEXT,

    order_status: {
        type: DataTypes.ENUM("PENDING", "CONFIRMED", "SHIPPED", "OUT_FOR_DELIVERY", "DELIVERED", "NDR", "RTO", "CANCELLED"),  // 🔹 Order lifecycle
        allowNull: false,
    },
    total_amount: DataTypes.DECIMAL(10, 2),
}, {
    timestamps: true,
});
