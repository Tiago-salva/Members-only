const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../models/userModel");

// Sign up
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

// Log in
async function renderLogInForm(req, res) {
  res.render("log-in-form");
}

// Log out
async function logOut(req, res) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    res.redirect("/log-in");
  });
}

// Membership status
async function membershipStatusGet(req, res) {
  res.render("membership-status");
}

async function membershipStatusPost(req, res) {
  const userCode = req.body.membershipCode;
  const secretCode = "iamaroottree";
  if (userCode === secretCode) {
    await db.changeMembershipStatus(res.locals.currentUser.id);
    // Lo tendria que llevar al perfil
    res.redirect("/messages");
  }

  req.flash("error", "Invalid membership code");
  res.redirect("/membership");
}

module.exports = {
  createUserGet,
  createUserPost,
  renderLogInForm,
  logOut,
  membershipStatusGet,
  membershipStatusPost,
};
