import express from "express";
import { auth, requireRole } from "../middlewares/auth.js";
import {
  createOrder,
  myOrders,
  vendorOrders,
  vendorAccept,
  vendorPack,
  vendorShip,
  markDelivered,
  cancelOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", auth, requireRole("seller"), createOrder);
router.get("/mine", auth, requireRole("seller"), myOrders);

router.get("/vendor", auth, requireRole("vendor"), vendorOrders);
router.put("/:id/accept", auth, requireRole("vendor"), vendorAccept);
router.put("/:id/pack", auth, requireRole("vendor"), vendorPack);
router.put("/:id/ship", auth, requireRole("vendor"), vendorShip);

router.put(
  "/:id/delivered",
  auth,
  requireRole("admin", "seller"),
  markDelivered
);
router.put("/:id/cancel", auth, requireRole("admin", "seller"), cancelOrder);

export default router;
