const Products = require("../models/product");
const { productSchema } = require("../utils/validation_schema");

// function to get all products
const getProducts = async (req, res) => {
  try {
    const products = await Products.find()
      .populate({ path: "category", select: " name" })
      .exec();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// function to get a single product
const getProduct = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "No product found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// function to create a new product
const createProduct = async (req, res) => {
  const { name, price, stock, category, desc } = req.body;
  try {
    const { error } = await productSchema(req.body);
    error && res.status(400).json({ message: error.details[0].message });
    const newProduct = new Products({
      name,
      price,
      stock,
      category,
      desc,
    });
    await newProduct.save();
    res.status(201).json({ newProduct, message: "Product added" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// function to update a specific product
const updateProduct = async (req, res) => {
  const product = req.body;
  const { name, price, stock, category, desc } = product;
  const updatedProduct = {
    name,
    price,
    stock,
    category,
    desc,
  };
  try {
    const { error } = await productSchema(product);
    error && res.status(400).json({ message: error.details[0].message });

    // if there is no validation error
    let toBeUpdated = await Products.findById(req.params.id);
    !toBeUpdated && res.status(404).json({ message: "Product not found" });
    updated = await Products.findByIdAndUpdate(
      req.params.id,
      { $set: product },
      { new: true }
    );
    res.status(200).json({ updated, message: "Update completed" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// function to delete single product
const deleteProduct = async (req, res) => {
  try {
    let product = await Products.findById(req.params.id);
    !product && res.status(404).json({ message: "Product not found" });

    await Products.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
