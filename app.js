// Node.js modules
const path = require("node:path");

// Environment variables
require("dotenv").config();

// Third-party modules
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const pgSession = require("connect-pg-simple")(session);

// Custom configuration
const initializePassport = require("./config/passport-config");
const pool = require("./config/db-config");

// Routes
const authRouter = require("./src/routes/authRouter");
const messagesRouter = require("./src/routes/messagesRouter");

// App
const app = express();

app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname));

// Passport
initializePassport(passport);

app.use(
  session({
    store: new pgSession({
      pool: pool,
      tableName: "session",
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(passport.session());

// Flash
app.use(flash());
app.use((req, res, next) => {
  res.locals.messages = {
    error: req.flash("error"),
    success: req.flash("success"),
  };
  next();
});

// Gives access to all views to currentUser
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// Routes
app.use("/", messagesRouter);
app.use("/", authRouter);

app.listen(3000, () => console.log("App listening on port 3000"));
