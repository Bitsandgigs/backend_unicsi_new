import express from "express";
import { auth, requireRole } from "../middlewares/auth.js";
import {
  listMarketplaceProducts,
  createListing,
  myListings,
  updateListing,
} from "../controllers/marketplaceController.js";

const router = express.Router();

// public marketplace
router.get("/products", listMarketplaceProducts);

// seller actions
router.post("/listings", auth, requireRole("seller"), createListing);
router.get("/listings/mine", auth, requireRole("seller"), myListings);
router.put("/listings/:id", auth, requireRole("seller"), updateListing);

export default router;
