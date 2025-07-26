const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../models/userModel");

// Sign In
async function createUserGet(req, res) {
  res.render("sign-up-form");
}

async function createUserPost(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("sign-up-form", {
      errors: errors.array(),
      formData: req.body,
    });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  await db.insertUser(req.body, hashedPassword);

  res.redirect("/messages");
}

// Log In
async function renderLogInForm(req, res) {
  res.render("log-in-form");
}

module.exports = {
  createUserGet,
  createUserPost,
  renderLogInForm,
};
