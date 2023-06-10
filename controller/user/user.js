import User from "../../model/user.js";
import Shop from "../../model/shop.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cryptr from "cryptr";
import Product from "../../model/product.js";
const cryptrKey = new cryptr("myTotalySecretKey");

export const registerUser = async (req, res) => {
  try {
    let isUserExist = await User.findOne({
      where: { email: req.body.email },
    });
    if (isUserExist) {
      return res.status(404).json({ error: "User already register" });
    }

    const { name, email, password, roleId, location } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      roleId,
      location: {
        type: location.type,
        coordinates: location.coordinates,
      },
    });
    await user.save();

    res.status(200).json({
      user,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const tokenTemp = jwt.sign({ _id: user._id }, "thisisme", {
      expiresIn: "20m",
    });
    const token = cryptrKey.encrypt(tokenTemp);

    user.tokens = user.tokens.concat({ token });
    await user.save();

    res.status(200).json({
      user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const listShop = async (req, res) => {
  try {
    if (req.role !== "user") {
      return res.status(403).json({ error: "Access denied" });
    }
    const maxDistance = req.query.distance || "1000";
    const userLocation = req.user.location.coordinates;

    const shops = await Shop.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: userLocation,
          },
          $maxDistance: maxDistance,
        },
      },
    });

    res.json({ shops });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const listProduct = async (req, res) => {
  try {
    if (req.role !== "user") {
      return res.status(403).json({ error: "Access denied" });
    }
    const maxDistance = req.query.distance || "1000";
    const userLocation = req.user.location.coordinates;

    const product = await Product.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: userLocation,
          },
          $maxDistance: maxDistance,
        },
      },
    });

    res.json({ product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
