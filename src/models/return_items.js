import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const ReturnItem = sequelize.define("return_items", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    return_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },

    order_item_id: {
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

    condition_received: {
        type: DataTypes.ENUM("good", "damaged", "used", "missing"),
        allowNull: true,
    },

    resolution: {
        type: DataTypes.ENUM("refund", "replace", "restock", "discard"),
        allowNull: true,
    },
}, {
    timestamps: true,
    underscored: true,
});
