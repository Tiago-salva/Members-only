const { Router } = require("express");
const {
  createUserGet,
  createUserPost,
  renderLogInForm,
  authenticateUser,
} = require("../controllers/authController");
const { body } = require("express-validator");
const authRouter = Router();
const passport = require("passport");
const { isNotAuthenticated } = require("../middleware/authMiddleware");

// Sign Up
authRouter.get("/sign-up", isNotAuthenticated, createUserGet);

authRouter.post(
  "/sign-up",
  [
    body("firstName").notEmpty().withMessage("The first name is obligatory"),
    body("lastName").notEmpty().withMessage("The last name is obligatory"),
    body("email").isEmail().withMessage("The email must be valid"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("The password must contain at least 8 characters"),
    body("confirmPassword")
      .custom((value, { req }) => value === req.body.password)
      .withMessage("The passwords are different"),
  ],
  createUserPost
);

// Log In
authRouter.get("/log-in", isNotAuthenticated, renderLogInForm);

authRouter.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
  })
);

module.exports = authRouter;
