import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const OrderAddress = sequelize.define("order_addresses", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    order_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },

    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    address_line1: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    pincode: DataTypes.STRING,
}, {
    timestamps: true,
    underscored: true,
});
