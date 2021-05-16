const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const authHandler = require("./src/middlewares/authHandler");
//initializing dotenv config to access env variables
dotenv.config();

// importing connection function from config file
const connectDB = require("./src/config/dbConfig");

// calling connection function
connectDB();

// importing routes
const productRoutes = require("./src/routes/products");
const categoryRoutes = require("./src/routes/categories");
const orderRoutes = require("./src/routes/orders");
const authRoutes = require("./src/routes/users");
// initializing express app
const app = express();

// using middlewares
app.use(cors());
app.use(express.json({ extended: true }));

//  routes
app.get("/", (req, res) => {
  res.send("Welcome to POS api");
});
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", authHandler, categoryRoutes);
app.use("/api/orders", orderRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
