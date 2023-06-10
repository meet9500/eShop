import Shop from "../../model/shop.js";
import Product from "../../model/product.js";
import mongoose from "mongoose";

export const registerProduct = async (req, res) => {
  try {
    const { shopId } = req.params;
    const { name, price, quantity } = req.body;

    let isShopExist = await Shop.findOne({
      where: { _id: shopId },
    });

    if (req.role !== "shop") {
      return res.status(403).json({ error: "Access denied" });
    }
    const product = new Product({
      name,
      price,
      quantity,
      shopId: shopId,
      userId: req.userId,
    });
    await product.save();

    res.status(200).json({
      product,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const editProduct = async (req, res) => {
  try {
    const { shopId } = req.params;
    const { name, location } = req.body;

    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({ error: "Shop not found" });
    }

    if (shop.userId.toString() !== req.userId) {
      return res.status(403).json({ error: "Access denied" });
    }

    shop.name = name;
    shop.location = location;

    await shop.save();
    console.log("Shop updated:", shop);

    res.status(200).json({
      shop,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { shopId } = req.params;

    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({ error: "Shop not found" });
    }

    if (shop.userId.toString() !== req.userId) {
      return res.status(403).json({ error: "Access denied" });
    }

    await Shop.findByIdAndDelete(shopId);

    res.status(200).json({ message: "Shop deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const listProduct = async (req, res) => {
  try {
    const { shopId } = req.params;

    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({ error: "Shop not found" });
    }

    if (shop.userId.toString() !== req.userId) {
      return res.status(403).json({ error: "Access denied" });
    }

    await Shop.findByIdAndDelete(shopId);

    res.status(200).json({ message: "Shop deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
