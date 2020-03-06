const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const login = new LocalStrategy(
  function (username, password, done) {
    if (username === "Test" && password === "Test") {
      const testUser = { username: username }
      return testUser
    }
    // User.findOne({ username: username }, function (err, user) {
    //   if (err) { return done(err); }
    //   if (!user) { return done(null, false); }
    //   if (!user.verifyPassword(password)) { return done(null, false); }
    //   return done(null, user);
    // });
  }
)

module.exports = passport.use(login)