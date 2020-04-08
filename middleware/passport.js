const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const bcrypt = require("bcryptjs");
require("../DB_modules/DB");
const users = require("../DB_modules/user");
require("dotenv").config();

// normal login strategy with passport
const login = new LocalStrategy(
	{ usernameField: "loginUser", passwordField: "loginPw", session: false },
	(username, password, done) => {
		users.findOne({ email: username }, async (err, user) => {
			if (!user) {
				return done(null, false, { message: "username not found" });
			} else {
				try {
					bcrypt
						.compare(password, user.password)
						.then(function (result) {
							if (result === true) {
								delete user._doc.password;
								return done(null, user);
							} else {
								return done(null, false, {
									message: "username or password does not match",
								});
							}
						})
						.catch((err) => Error("bcrypt:" + err));
				} catch (error) {
					return done(error);
				}
			}
		});
	}
);

// returns string value of jwt cookie
const cookieExtractor = function (req) {
	let token = null;
	if (req && req.cookies) {
		try {
			token = req.cookies["jwt"]["token"];
			return token;
		} catch (err) {
			return token;
		}
	}
};

// jwt login strategy for passport
const jwtLogin = new JwtStrategy(
	{
		jwtFromRequest: cookieExtractor,
		secretOrKey: process.env.JWT,
	},
	function (payload, done) {
		users.findById({ _id: payload._id }, async (err, user) => {
			delete user._doc.password;
			return user
				? done(null, user)
				: done(null, false, {
						error: "Not valid,please try again",
				  });
		});
	}
);

module.exports = passport.use(login).use(jwtLogin);
