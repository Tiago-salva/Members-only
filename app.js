const express = require("express");
const path = require("node:path");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const pgSession = require("connect-pg-simple")(session);
const authRouter = require("./src/routes/authRouter");
const initializePassport = require("./config/passport-config");
const pool = require("./config/db-config");
const messagesRouter = require("./src/routes/messagesRouter");

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
    // Reemplazar por .env luego
    secret: "cats",
    resave: false,
    saveUninitialized: false,
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

// Da acceso al usuario actual a todos los views
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// Routes
app.get("/", (req, res) => {
  res.render("home");
});
app.use("/messages", messagesRouter);
app.use("/", authRouter);

// Usar variable en .env
app.listen(3000, () => console.log("App listening on port 3000"));
