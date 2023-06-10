import mongoose from "mongoose";
const connectionUrl = "mongodb://127.0.0.1:27017/shop";
import Role from "../model/role.js";

const createDefaultRoles = async () => {
  try {
    const existingRoles = await Role.find();
    if (existingRoles.length === 0) {
      const userRole = new Role({ name: "user" });
      await userRole.save();
      const shopRole = new Role({ name: "shop" });
      await shopRole.save();
      console.log("Default roles created successfully");
    }
  } catch (err) {
    console.error("Failed to create default roles:", err);
  }
};

mongoose
  .connect(connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection succesful");
    createDefaultRoles();
  })
  .catch((err) => {
    console.log("connection fail", err);
  });
