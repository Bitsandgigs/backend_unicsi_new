export const Return = sequelize.define("returns", {
    return_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    order_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },

    seller_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },

    supplier_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },

    return_type: {
        type: DataTypes.ENUM("customer_return", "rto"),
        allowNull: false,
    },

    initiated_by: {
        type: DataTypes.ENUM("customer", "courier", "system"),
        allowNull: false,
    },

    return_status: {
        type: DataTypes.ENUM(
            "requested",
            "approved",
            "pickup_scheduled",
            "in_transit",
            "received",
            "inspected",
            "resolved",
            "rejected"
        ),
        defaultValue: "requested",
    },

    reason_code: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: true,
    underscored: true,
});
