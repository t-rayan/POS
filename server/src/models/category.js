const mongoose = require("mongoose");

// initalizing categorySchema with req fields
const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  created_at: {
    type: Date,
    default: Date.now(),
  },
});
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
