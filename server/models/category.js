const mongoose = require("mongoose");

const CategoriesShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Categories = mongoose.model("categories", CategoriesShema);
module.exports = Categories;
