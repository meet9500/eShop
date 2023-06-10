import express from "express";
import ApiRoutes from "./router/index.js";
// const apiRoutes = require("./router/userRouter");
import "./db/mongoose.js";

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", ApiRoutes);

app.listen(port, () => {
  console.log("runnimmg on " + port);
});
