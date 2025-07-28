const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const db = require("../src/models/userModel");

function initializePassport(passport) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await db.getUserBy("username", username);

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: "Incorrect password" });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.getUserBy("id", id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}

module.exports = initializePassport;
