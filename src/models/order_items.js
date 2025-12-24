

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const OrderItem = sequelize.define("order_items", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    order_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },

    supplier_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },

    sku: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    selling_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },

    supplier_cost: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },

    item_status: {
        type: DataTypes.ENUM(
            "pending",
            "allocated",
            "packed",
            "shipped",
            "delivered",
            "cancelled",
            "returned"
        ),
        defaultValue: "pending",
    },
}, {
    timestamps: true,
    underscored: true,
});
