import {  Supplier, SupplierAuth, SupplierKyc, SupplierAddress, Product, ProductVariant, ProductImage, Warehouse, Inventory, SupplierPricing, Reseller, Order, OrderItem, NdrCase, LedgerEntry } from "../models/index.js";

/* ===========================
   ASSOCIATIONS (MUST BE HERE)
=========================== */

// Supplier core
Supplier.hasOne(SupplierAuth, { foreignKey: "supplier_id" });
Supplier.hasOne(SupplierKyc, { foreignKey: "supplier_id" });
Supplier.hasMany(SupplierAddress, { foreignKey: "supplier_id" });
// Supplier.hasMany(SupplierToken, { foreignKey: "supplier_id" });

SupplierAuth.belongsTo(Supplier);
SupplierKyc.belongsTo(Supplier);
SupplierAddress.belongsTo(Supplier);
// SupplierToken.belongsTo(Supplier);

// Supplier → Product
Supplier.hasMany(Product, { foreignKey: "supplier_id" });
Product.belongsTo(Supplier);

// Product → Variant
Product.hasMany(ProductVariant, {
    foreignKey: "product_id",
    as: "variants",
});
ProductVariant.belongsTo(Product, {
    foreignKey: "product_id",
});

// Variant → Images
ProductVariant.hasMany(ProductImage, {
    foreignKey: "variant_id",
    as: "images",
});
ProductImage.belongsTo(ProductVariant, {
    foreignKey: "variant_id",
});

// Supplier → Warehouse
Supplier.hasMany(Warehouse, { foreignKey: "supplier_id" });
Warehouse.belongsTo(Supplier, { foreignKey: "supplier_id" });

// Variant → Inventory
ProductVariant.hasMany(Inventory, {
    foreignKey: "variant_id",
    as: "inventory",
});
Inventory.belongsTo(ProductVariant, {
    foreignKey: "variant_id",
});

// Variant → Pricing
ProductVariant.hasOne(SupplierPricing, {
    foreignKey: "variant_id",
    as: "pricing",
});
SupplierPricing.belongsTo(ProductVariant, {
    foreignKey: "variant_id",
});


Reseller.hasMany(Order, { foreignKey: "reseller_id" });
Order.belongsTo(Reseller);


Order.hasMany(OrderItem, { foreignKey: "order_id" });
OrderItem.belongsTo(Order);

OrderItem.hasOne(NdrCase, { foreignKey: "order_item_id" });
NdrCase.belongsTo(OrderItem);


