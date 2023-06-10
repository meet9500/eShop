import User from "../../model/user.js";
import Shop from "../../model/shop.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cryptr from "cryptr";
const cryptrKey = new cryptr("myTotalySecretKey");

export const registerUser = async (req, res) => {
  try {
    let isUserExist = User.findOne({
      where: { email: req.body.email },
    });
    console.log(isUserExist);

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

    console.log(user);
    res.status(200).json({
      isUserExist,
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
      expiresIn: "5m",
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

    const shops = await Shop.find();
    res.json(shops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
