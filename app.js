const express = require("express");
const path = require("node:path");
const app = express();
const session = require("express-session");
const passport = require("passport");
const pgSession = require("connect-pg-simple")(session);
const authRouter = require("./src/routes/authRouter");
const initializePassport = require("./config/passport-config");
const pool = require("./config/db-config");

app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

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
// Passport

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/", authRouter);

// Usar variable en .env
app.listen(3000, () => console.log("App listening on port 3000"));
