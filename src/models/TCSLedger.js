import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const TCSLedger = sequelize.define("tcs_ledger", {
    id: DataTypes.UUID,
    seller_id: DataTypes.UUID,
    order_id: DataTypes.UUID,
    taxable_value: DataTypes.FLOAT,
    tcs_amount: DataTypes.FLOAT, // 1%
    deposit_status: DataTypes.BOOLEAN,
});
