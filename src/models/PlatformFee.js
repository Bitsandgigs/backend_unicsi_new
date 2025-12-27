
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const PlatformFee = sequelize.define("platform_fees", {
    platform_fee_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    order_id: DataTypes.UUID,

    fee_type: {
        type: DataTypes.ENUM("commission", "shipping", "subscription"),
    },

    amount: DataTypes.FLOAT,
    gst_amount: DataTypes.FLOAT,
}, {
    timestamps: true,
    underscored: true,
});
