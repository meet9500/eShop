import Shop from "../../model/shop.js";
import Product from "../../model/product.js";

export const registerProduct = async (req, res) => {
  try {
    const { shopId } = req.params;
    const { name, price, quantity, location } = req.body;

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
      location: {
        type: location.type,
        coordinates: location.coordinates,
      },
    });
    await product.save();

    res.status(200).json({
      product,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "product not found" });
    }

    if (product.userId.toString() !== req.userId) {
      return res.status(403).json({ error: "Access denied" });
    }

    const updatedProduct = await Product.updateOne(
      { _id: productId },
      req.body
    );

    console.log("updated Product:", updatedProduct);

    res.status(200).json({
      updatedProduct,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "product not found" });
    }

    if (product.userId.toString() !== req.userId) {
      return res.status(403).json({ error: "Access denied" });
    }

    await Product.findByIdAndDelete(productId);

    res.status(200).json({ message: "product deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
