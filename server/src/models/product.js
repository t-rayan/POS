const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: "Other",
  },
  // created_at: {
  //   type: Date,
  //   default: Date.now(),
  // },
});

const Products = mongoose.model("Products", productSchema);
module.exports = Products;
