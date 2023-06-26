const mongoose = require("mongoose");
const User = require("../models/user");
const express = require("express");
const { hashPassword } = require("../utils/hashPassword");
const { comparePassword } = require("../utils/comparePassword");
const { validateEmail } = require("../utils/emailValidator");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Enter all the credentials" });
    }

    const checking = await validateEmail(email);
    if (!checking) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    const hashedPass = await hashPassword(password);

    let newUser = new User({
      username,
      email,
      password: hashedPass,
    });

    if (!newUser) {
      return res.status(500).json({ message: "No User Created" });
    }

    const user = await newUser.save();
    res.status(200).json({ user: user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    let user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(404).json({ error: "Wrong Credentials" });
    }

    const validated = await comparePassword(req.body.password, user.password);
    if (!validated) {
      return res.status(404).json({ error: "Wrong Credentials" });
    }
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = {
  register,
  login,
};
