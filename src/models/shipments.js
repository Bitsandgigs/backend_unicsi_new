
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const Shipment = sequelize.define("shipments", {
    shipment_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    fulfillment_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },

    courier_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    tracking_number: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    shipping_status: {
        type: DataTypes.ENUM(
            "label_created",
            "in_transit",
            "out_for_delivery",
            "delivered",
            "rto"
        ),
        defaultValue: "label_created",
    },

    shipped_at: DataTypes.DATE,
    delivered_at: DataTypes.DATE,
}, {
    timestamps: true,
    underscored: true,
});
