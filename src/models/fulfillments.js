export const Fulfillment = sequelize.define("fulfillments", {
    fulfillment_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    supplier_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },

    order_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },

    fulfillment_status: {
        type: DataTypes.ENUM(
            "pending",
            "accepted",
            "packed",
            "shipped",
            "delivered",
            "failed"
        ),
        defaultValue: "pending",
    },

    warehouse_id: {
        type: DataTypes.UUID,
        allowNull: true,
    },
}, {
    timestamps: true,
    underscored: true,
});
