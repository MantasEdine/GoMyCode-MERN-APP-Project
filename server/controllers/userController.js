const bcrypt = require("bcrypt");
const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
const Post = require("../models/post");
const { hashPassword } = require("../utils/hashPassword");

const updateUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      if (req.body.password) {
        const password = await hashPassword(req.body.password);
        req.body.password = password;
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(401).json({ error: "You can only update your own account" });
  }
};

const deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);

      if (deletedUser) {
        await Post.deleteMany({ username: deletedUser.username });
        res.status(200).json({ message: "User has been deleted" });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(401).json({ error: "You can only delete your own account" });
  }
};

const getUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        const { password, ...other } = user._doc;
        res.status(200).json(other);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(401).json({ error: "You can only access your own account" });
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getUser,
};
