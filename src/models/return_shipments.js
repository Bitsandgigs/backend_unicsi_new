

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const ReturnShipment = sequelize.define("return_shipments", {
    shipment_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    return_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },

    courier_name: DataTypes.STRING,
    tracking_number: DataTypes.STRING,

    shipment_status: {
        type: DataTypes.ENUM(
            "pickup_requested",
            "picked_up",
            "in_transit",
            "delivered_to_supplier",
            "lost"
        ),
        defaultValue: "pickup_requested",
    },
}, {
    timestamps: true,
    underscored: true,
});
