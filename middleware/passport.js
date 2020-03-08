const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const bcrypt = require("bcryptjs");
const { checkUsername } = require("../controller/userController");
require("dotenv").config();

const login = new LocalStrategy(
  { usernameField: "loginUser", passwordField: "loginPw", session: false },
  function(username, password, done) {
    const user = checkUsername(username);
    if (!user) {
      return done(null, false, { message: "username" });
    }

    try {
      const match = bcrypt
        .compare(password, user.password)
        .then(function() {
          if (match) {
            return done(null, user);
          } else {
            return done(null, false, { message: "pw" });
          }
        })
        .catch(err => Error("bcrypt"));
    } catch (error) {
      return done(error);
    }
  }
);

const cookieExtractor = function(req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};

const jwtLogin = new JwtStrategy(
  {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT
  },
  function(payload, done) {
    const user = checkUsername(payload.username);
    console.log(user);
    return user
      ? done(null, user)
      : done(null, false, {
          error: "Not valid"
        });
  }
);

module.exports = passport.use(login).use(jwtLogin);
