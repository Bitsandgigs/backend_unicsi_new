
import { Supplier, SupplierAuth, SupplierKyc, SupplierAddress, SupplierToken, Product, ProductVariant, ProductImage, Warehouse, Inventory, SupplierPricing } from "../models/index.js";

Supplier.hasOne(SupplierAuth, { foreignKey: "supplier_id" });
Supplier.hasOne(SupplierKyc, { foreignKey: "supplier_id" });
Supplier.hasMany(SupplierAddress, { foreignKey: "supplier_id" });
Supplier.hasMany(SupplierToken, { foreignKey: "supplier_id" });

SupplierAuth.belongsTo(Supplier);
SupplierKyc.belongsTo(Supplier);
SupplierAddress.belongsTo(Supplier);
SupplierToken.belongsTo(Supplier);

Supplier.hasMany(Product, { foreignKey: "supplier_id" });
Product.belongsTo(Supplier);

Product.hasMany(ProductVariant, { foreignKey: "product_id" });
ProductVariant.belongsTo(Product);

Product.hasMany(ProductImage, { foreignKey: "product_id" });

Supplier.hasMany(Warehouse, { foreignKey: "supplier_id" });

ProductVariant.hasMany(Inventory, { foreignKey: "sku", sourceKey: "sku" });
ProductVariant.hasOne(SupplierPricing, { foreignKey: "sku", sourceKey: "sku" });

