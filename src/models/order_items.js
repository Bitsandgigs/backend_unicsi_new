

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const OrderItem = sequelize.define("order_items", {
    order_item_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    order_id: DataTypes.UUID,
    sku: DataTypes.STRING,
    quantity: DataTypes.INTEGER,

    supplier_price: DataTypes.DECIMAL(10, 2),
    reseller_price: DataTypes.DECIMAL(10, 2),
}, {
    timestamps: true,
});
