import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const OrderStatusHistory = sequelize.define("order_status_history", {
    order_status_history_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    order_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "orders",
            key: "order_id",
        },
    },

    status: {
        type: DataTypes.ENUM("pending", "shipped", "delivered", "cancelled"),
        allowNull: false,
    },
    changed_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
});

