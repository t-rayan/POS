const mongoose = require("mongoose");
const Category = require("../models/category");
const { categorySchema } = require("../utils/validation_schema");

// function to get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// function to get all categories
const getCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    if (!category) {
      res.status(404).json({ message: "Category not found." });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
// function to create a new category
const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const { error } = await categorySchema(req.body);
    error && res.status(400).json({ message: error.details[0].message });
    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(201).json({ newCategory, message: "Category Added" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// function to update a specifi category
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const { error } = await categorySchema(req.body);
    error && res.status(400).json({ message: error.details[0].message });

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "Category not found" });
    // if no validation error
    const updatedCategory = { name, _id: id };
    await Category.findByIdAndUpdate(id, updatedCategory, { new: true });
    res.status(200).json({ updatedCategory, message: "Update successful" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// function to delete category
const delCategory = async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);
    !category && res.status(404).json({ message: "Category not found" });

    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Category removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  delCategory,
  updateCategory,
};
