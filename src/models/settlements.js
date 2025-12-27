

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const Settlement = sequelize.define("settlements", {
    settlement_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    entity_type: {
        type: DataTypes.ENUM("seller", "supplier"),
        allowNull: false,
    },

    entity_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },

    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },

    settlement_status: {
        type: DataTypes.ENUM("pending", "processing", "completed", "failed"),
        defaultValue: "pending",
    },

    bank_reference: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    settlement_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    timestamps: true,
    underscored: true,
});
