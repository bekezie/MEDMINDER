let passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;
const mediDB = require("../db/mediDB");
const passwordUtils = require("./passwordUtils");

passport.use(
  new LocalStrategy(
    { usernameField: "userEmail", passwordField: "userPassword" },
    async function (username, password, done) {
      try {
        const user = await mediDB.getUserByEmail(username);
        if (!user) {
          // if the email doesn't exist in our database, we pass null, false into the callback
          return done(null, false);
        }
        // if the user exists, we now check if the password was correct and that the hash values match
        const isPasswordValid = passwordUtils.validatePassword(
          password,
          user.hash,
          user.salt
        );

        if (isPasswordValid) {
          // if the password is correct, we return the user from the database
          return done(null, user);
        } else {
          // if the password was wrong, we send "false" to the callback
          return done(null, false);
        }
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  // this is the user we get from the database. we could use the email or the _id to serialize the user to a session. we will use the _id for a little extra obscurity and security.
  done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await mediDB.getUserById(userId);
    if (user) {
      done(null, user);
    }
  } catch (err) {
    done(err);
  }
});
