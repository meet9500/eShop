import jwt from "jsonwebtoken";
import User from "../model/user.js";
import cryptr from "cryptr";
const cryptrKey = new cryptr("myTotalySecretKey");

export const authenticateToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decrypt = cryptrKey.decrypt(token);
    const decoded = jwt.verify(decrypt, "thisisme");
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    })
      .populate("roleId", "name")
      .exec();
    if (!user) {
      console.log("error");
      throw new Error();
    }

    req.userId = decoded._id;
    req.role = user.roleId.name;
    req.user = user;

    next();
  } catch (e) {
    res.status(401).send({ error: "please authintacte" });
  }
};
