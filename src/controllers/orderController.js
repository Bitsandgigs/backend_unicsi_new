import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import Product from "../models/Product.js";
import Shipment from "../models/Shipment.js";
import { Sequelize } from "sequelize";

// Seller creates an order (customer checkout)
export const createOrder = async (req, res) => {
  const sellerId = req.user.id;
  const { items, customer, shippingFee = 0, platformFee = 0 } = req.body;
  // items: [{ productId, qty, price }]
  if (!items?.length) return res.status(400).json({ message: "No items" });

  const t = await Order.sequelize.transaction();
  try {
    // Validate products & compute totals & pick the vendor (single-vendor per order for now)
    const p = await Product.findByPk(items[0].productId);
    if (!p || p.status !== "approved") throw new Error("Invalid product");
    const vendorId = p.vendorId;

    let subtotal = 0;
    for (const I of items) {
      const prod = await Product.findByPk(I.productId, {
        transaction: t,
        lock: t.LOCK.UPDATE,
      });
      if (!prod || prod.vendorId !== vendorId)
        throw new Error("Mixed vendors not allowed");
      if (prod.qtyInStock < I.qty)
        throw new Error(`Insufficient stock for ${prod.title}`);
      subtotal += Number(I.price) * Number(I.qty);
      await prod.update(
        { qtyInStock: prod.qtyInStock - I.qty },
        { transaction: t }
      );
    }

    const total = subtotal + Number(shippingFee) + Number(platformFee);

    const order = await Order.create(
      {
        sellerId,
        vendorId,
        subtotal,
        shippingFee,
        platformFee,
        total,
        customerName: customer.name,
        customerPhone: customer.phone,
        address1: customer.address1,
        address2: customer.address2,
        city: customer.city,
        state: customer.state,
        pincode: customer.pincode,
        country: customer.country,
      },
      { transaction: t }
    );

    for (const I of items) {
      const prod = await Product.findByPk(I.productId, { transaction: t });
      await OrderItem.create(
        {
          orderId: order.id,
          productId: prod.id,
          title: prod.title,
          qty: I.qty,
          unitPrice: I.price,
          lineTotal: Number(I.qty) * Number(I.price),
        },
        { transaction: t }
      );
    }

    await Shipment.create(
      { orderId: order.id, status: "pending" },
      { transaction: t }
    );

    await t.commit();
    res.status(201).json({ success: true, data: order });
  } catch (e) {
    await t.rollback();
    res.status(400).json({ message: e.message });
  }
};

// Seller views their orders
export const myOrders = async (req, res) => {
  const sellerId = req.user.id;
  const data = await Order.findAll({
    where: { sellerId },
    include: ["items", "shipment"],
  });
  res.json({ success: true, data });
};

// Vendor views orders to fulfill
export const vendorOrders = async (req, res) => {
  const vendorId = req.user.id;
  const data = await Order.findAll({
    where: { vendorId },
    include: ["items", "shipment"],
  });
  res.json({ success: true, data });
};

export const vendorAccept = async (req, res) => {
  const vendorId = req.user.id;
  const { id } = req.params;
  const order = await Order.findOne({ where: { id, vendorId } });
  if (!order) return res.status(404).json({ message: "Not found" });
  if (order.status !== "created")
    return res.status(400).json({ message: "Invalid state" });
  await order.update({ status: "accepted" });
  res.json({ success: true });
};

export const vendorPack = async (req, res) => {
  const vendorId = req.user.id;
  const { id } = req.params;
  const order = await Order.findOne({ where: { id, vendorId } });
  if (!order) return res.status(404).json({ message: "Not found" });
  if (order.status !== "accepted")
    return res.status(400).json({ message: "Invalid state" });
  await order.update({ status: "packed" });
  res.json({ success: true });
};

export const vendorShip = async (req, res) => {
  const vendorId = req.user.id;
  const { id } = req.params;
  const { carrier, trackingNumber, labelUrl } = req.body;
  const order = await Order.findOne({
    where: { id, vendorId },
    include: ["shipment"],
  });
  if (!order) return res.status(404).json({ message: "Not found" });
  if (!["accepted", "packed"].includes(order.status))
    return res.status(400).json({ message: "Invalid state" });
  await order.update({ status: "shipped" });
  await order.shipment.update({
    carrier,
    trackingNumber,
    labelUrl,
    status: "in_transit",
  });
  res.json({ success: true });
};

export const markDelivered = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findByPk(id, { include: ["shipment"] });
  if (!order) return res.status(404).json({ message: "Not found" });
  await order.update({ status: "delivered", paymentStatus: "paid" });
  await order.shipment.update({ status: "delivered" });
  res.json({ success: true });
};

export const cancelOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findByPk(id);
  if (!order) return res.status(404).json({ message: "Not found" });
  if (["shipped", "delivered"].includes(order.status))
    return res.status(400).json({ message: "Too late to cancel" });
  await order.update({ status: "cancelled" });
  res.json({ success: true });
};

// Admin overview
export const adminOrders = async (_req, res) => {
  const data = await Order.findAll({ include: ["items", "shipment"] });
  res.json({ success: true, data });
};
