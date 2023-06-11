import Shop from "../../model/shop.js";

export const registerShop = async (req, res) => {
  try {
    const { name, location } = req.body;
    const shop = new Shop({
      name,
      userId: req.userId,
      location: {
        type: location.type,
        coordinates: location.coordinates,
      },
    });
    await shop.save();

    res.status(200).json({
      shop,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const updateShop = async (req, res) => {
  try {
    const { shopId } = req.params;

    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({ error: "Shop not found" });
    }

    if (shop.userId.toString() !== req.userId) {
      return res.status(403).json({ error: "Access denied" });
    }

    const updatedShop = await Shop.updateOne(
      { _id: shopId },
      { $set: req.body }
    );

    console.log("Shop updated:", updatedShop);

    res.status(200).json({
      updatedShop,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const deleteShop = async (req, res) => {
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
