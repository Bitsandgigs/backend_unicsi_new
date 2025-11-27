import express from "express";
import { auth, requireRole } from "../middlewares/auth.js";
import {
  pendingProducts,
  approveProduct,
  rejectProduct,
  setPricing,
} from "../controllers/adminController.js";
import { adminOrders } from "../controllers/orderController.js";

const router = express.Router();

router.get("/products/pending", auth, requireRole("admin"), pendingProducts);
router.put("/products/:id/approve", auth, requireRole("admin"), approveProduct);
router.put("/products/:id/reject", auth, requireRole("admin"), rejectProduct);
router.put("/products/:id/pricing", auth, requireRole("admin"), setPricing);

router.get("/orders", auth, requireRole("admin"), adminOrders);

export default router;
