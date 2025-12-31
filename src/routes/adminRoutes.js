import express from "express";
const router = express.Router();
import SuperAdminController from "../controllers/superAdminController.js";

router.get("/products/pending", SuperAdminController.getPendingProducts);
router.get('/products/:product_id', SuperAdminController.getProductById);
router.post("/products/:product_id/approve", SuperAdminController.approveProduct);
router.post("/products/:product_id/reject", SuperAdminController.rejectProduct);
router.put("/products/:product_id/modified/:variant_id", SuperAdminController.modifiedProducts);

export default router;
