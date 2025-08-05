const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../models/userModel");

// Sign up
async function createUserGet(req, res) {
  res.render("sign-up-form", {
    errorMessages: {},
    formData: {},
  });
}

async function createUserPost(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = {};

    errors.array().forEach((error) => {
      errorMessages[error.path] = error.msg;
    });

    return res.render("sign-up-form", {
      errorMessages,
      formData: req.body,
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await db.insertUser(req.body, hashedPassword);
    res.redirect("/messages");
  } catch (err) {
    let errorMessages = {};
    if (err.code === "23505") {
      errorMessages.username = "That username is already taken";
    } else {
      errorMessages.general = "Unexpected error, please try again later";
    }

    res.render("sign-up-form", {
      errorMessages,
      formData: req.body,
    });
  }
}

// Log in
async function renderLogInForm(req, res) {
  res.render("log-in-form", {
    errorMessages: {},
    formData: {},
  });
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
  const adminCode = "stardewvalley";
  if (userCode === secretCode) {
    await db.changeMembershipStatus("Member", res.locals.currentUser.id);
    // Lo tendria que llevar al perfil
    res.redirect("/messages");
  } else if (userCode === adminCode) {
    await db.changeMembershipStatus("Admin", res.locals.currentUser.id);
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
