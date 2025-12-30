import express from "express";
const router = express.Router();
import upload from "../middlewares/uploadMiddleware.js";

import supplierController from "../controllers/supplierController.js";

router.post("/send-otp", supplierController.supplier_send_otp);
router.post("/verify-otp", supplierController.supplier_verify_otp);
router.post("/register", supplierController.supplier_register);
router.post("/login", supplierController.supplier_login);
router.post("/stores/bankAccountDetails", supplierController.supplier_bank_account_details);
router.post("/stores/gstDetails", supplierController.supplier_gst_details);
router.get("/getAllSupplier", supplierController.getAllSupplier);
router.post("/stores/products", supplierController.upload_products);
router.post("/stores/products/:product_id/variants", supplierController.upload_product_variants);
router.post("/stores/variants/:variant_id/images", upload.array("images", 10), supplierController.add_product_images);
router.post("/stores/warehouses", supplierController.create_warehouse);
router.put("/stores/warehouses/:warehouse_id", supplierController.update_warehouse);
router.get("/stores/warehouses/:warehouse_id", supplierController.get_warehouse);
router.delete("/stores/warehouses/:warehouse_id", supplierController.delete_warehouse);
router.post("/stores/inventory", supplierController.create_inventory);
router.get("/stores/inventory/sku/:sku", supplierController.get_inventory);
router.put("/stores/inventory/:inventory_id", supplierController.update_inventory);
router.delete("/stores/inventory/:inventory_id", supplierController.delete_inventory);

// router.post("/stores/uploadProducts", supplierController.supplier_products);




export default router;


// import express from "express";
// const router = express.Router();
// // import { auth, requireRole } from "../middlewares/auth";
// import supplierController from "../controllers/supplierController";
// // import supplierFnc from "../utils/supplierFnc";

// router.post("/send-otp", supplierController.supplier_send_otp);
// router.post("/verify-otp", supplierController.supplier_verify_otp);
// router.post("/signup", supplierController.supplier_signup);
// router.post("/login", supplierController.supplier_login);
// // router.get("/profile", auth, requireRole("supplier"), supplierController.supplier_profile);
// // router.put("/profile", auth, requireRole("supplier"), supplierController.supplier_update_profile);
// // router.put("/password", auth, requireRole("supplier"), supplierController.supplier_update_password);

// export default router;  
