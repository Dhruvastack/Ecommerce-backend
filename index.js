const express = require("express");
const env = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dbConfig = require("./src/config.js");
const app = express();
env.config();
app.use(bodyParser.json());

//routes

const authRoutes = require("./src/routes/auth");
const adminRoutes = require("./src/routes/admin/auth");
const categoryRoutes = require("./src/routes/category");
const productRoutes = require("./src/routes/product");
const cartRoutes = require("./src/routes/cart");
app.use("/api", authRoutes); //for having api prefix with all routes
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);




app.get("/", (req, res) => {
  res.status(200).json({ message: "hello from server" });
});

mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

app.listen(process.env.PORT, () => {
  console.log(`Server listening on the port ${process.env.PORT}`);
});
