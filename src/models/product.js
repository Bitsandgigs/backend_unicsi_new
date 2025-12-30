

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const Product = sequelize.define("products", {
    product_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    supplier_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },

    category_id: {
        type: DataTypes.UUID,
        allowNull: true,
    },

    brand: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    status: {
        type: DataTypes.ENUM("draft", "active", "paused", "archived"),
        defaultValue: "draft",
    },
}, {
    timestamps: true,
    underscored: true,
});
