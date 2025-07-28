const { Router } = require("express");
const {
  createUserGet,
  createUserPost,
  renderLogInForm,
  logOut,
  membershipStatusGet,
  membershipStatusPost,
} = require("../controllers/authController");
const { body, validationResult } = require("express-validator");
const authRouter = Router();
const passport = require("passport");
const { isNotAuthenticated } = require("../middleware/authMiddleware");

// Sign up
authRouter.get("/sign-up", isNotAuthenticated, createUserGet);

authRouter.post(
  "/sign-up",
  [
    body("firstName").notEmpty().withMessage("The first name is obligatory"),
    body("lastName").notEmpty().withMessage("The last name is obligatory"),
    body("username").notEmpty().withMessage("The username is obligatory"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("The password must contain at least 8 characters"),
    body("confirmPassword")
      .custom((value, { req }) => value === req.body.password)
      .withMessage("The passwords are different"),
  ],
  createUserPost
);

// Log in
authRouter.get("/log-in", isNotAuthenticated, renderLogInForm);

// Agregar validacion
authRouter.post(
  "/log-in",
  [
    body("username").notEmpty().withMessage("The username is obligatory"),
    body("password").notEmpty().withMessage("The password is obligatory"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("log-in-form", {
        errors: errors.array(),
      });
    }

    next();
  },
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
    failureFlash: true,
  })
);

// Log out
authRouter.get("/log-out", logOut);

// Membership status
authRouter.get("/membership", membershipStatusGet);

authRouter.post("/membership", membershipStatusPost);

module.exports = authRouter;
