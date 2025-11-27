import Product from "../models/Product.js";
import ProductImage from "../models/ProductImage.js";
import User from "../models/User.js";

export const pendingProducts = async (_req, res) => {
  const products = await Product.findAll({
    where: { status: "pending" },
    include: [
      { model: ProductImage, as: "images" },
      { model: User, as: "vendor", attributes: ["id", "name", "email"] },
    ],
  });
  res.json({ success: true, data: products });
};

export const approveProduct = async (req, res) => {
  const { id } = req.params;
  const { reviewNotes } = req.body;
  const product = await Product.findByPk(id);
  if (!product) return res.status(404).json({ message: "Not found" });
  await product.update({
    status: "approved",
    reviewNotes: reviewNotes || null,
  });
  res.json({ success: true });
};

export const rejectProduct = async (req, res) => {
  const { id } = req.params;
  const { reviewNotes } = req.body;
  const product = await Product.findByPk(id);
  if (!product) return res.status(404).json({ message: "Not found" });
  await product.update({
    status: "rejected",
    reviewNotes: reviewNotes || "Insufficient details",
  });
  res.json({ success: true });
};

export const setPricing = async (req, res) => {
  const { id } = req.params;
  const { suggestedPrice, minPrice, maxPrice } = req.body;
  const product = await Product.findByPk(id);
  if (!product) return res.status(404).json({ message: "Not found" });
  await product.update({ suggestedPrice, minPrice, maxPrice });
  res.json({ success: true });
};
