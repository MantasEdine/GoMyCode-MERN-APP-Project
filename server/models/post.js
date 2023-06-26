const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
  Post: {
    type: Array,
    required: false,
  },
});

const Posts = mongoose.model("posts", postsSchema);
module.exports = Posts;
