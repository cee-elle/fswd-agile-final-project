const express = require("express");
const passport = require("../middleware/passport");
const bcrypt = require("bcryptjs");
const authController = require("../controller/authController");
const { check, validationResult } = require("express-validator");
const { body } = require("express-validator");
const router = express.Router();

module.exports = (users) => {
	// login
	router.post("/gNQu5jGgxPL42r8g5zm6", (req, res, next) => {
		//req.body.loginUser
		users.findOne({ email: req.body.loginUser }, async (err, user) => {
			if (!user) {
				res.render("login_and_signup", {
					msg: "You are not a user",
					msgClass: "is-danger",
				});
			} else {
				passport.authenticate(
					"local",
					{ session: false },
					async (err, user, info) => {
						if (err || !user) {
							console.log(err, user);
							res.render("login_and_signup", {
								msg: info.message,
								msgClass: "is-danger",
							});
						}
						req.login(user, { session: false }, async (err) => {
							if (err) {
								res.send(err.message);
							}
							delete user.password; // delete password from token
							const payload = JSON.stringify(user);
							const token = authController.generateToken(payload);
							res
								.cookie(
									"jwt",
									{ token: token },
									{
										expires: new Date(Date.now() + 86400000),
										httpOnly: true,
									}
								)
								.redirect("/secure");
						});
					}
				)(req, res, next);
			}
		});
	});

	// signup
	router.post(
		"/JKp7DeJXgaFtxaJ7FTXb",
		[
			check("signupUser").isEmail(),
			check("signupPw")
				.isLength({ min: 6 })
				.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/)
				.withMessage(
					"At least one Upper case and one lower case must be at least 6 characters long"
				)
				.matches(/\d/)
				.withMessage("must contain a number"),
		],
		body("confirm_signupPw").custom((value, { req }) => {
			if (value !== req.body.signupPw) {
				throw new Error("Password confirmation does not match password");
			}

			// Indicates the success of this synchronous custom validator
			return true;
		}),
		async (req, res) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				console.log(errors.array());
				res.render("login_and_signup", {
					msg: errors.array(),
					msgClass: "is-danger",
				});
				return;
			}
			const { nickname, signupUser, signupPw, confirm_signupPw } = req.body;
			if (signupPw == confirm_signupPw) {
				users.findOne({ email: signupUser }, async (err, user) => {
					console.log(user);
					if (!user) {
						try {
							const pwHash = await bcrypt.hash(signupPw, 5);
							await users
								.create({
									name: nickname,
									email: signupUser,
									password: pwHash,
									role: "normal",
									dietary: "none",
									prefer_food: "none",
								})
								.then(async (user) => {
									delete user._doc.password;
									const token = await authController.generateToken(
										JSON.stringify(user)
									);
									res
										.cookie(
											"jwt",
											{ token: token },
											{
												expires: new Date(Date.now() + 86400000),
												httpOnly: true,
											}
										)
										.redirect("/secure");
								});
						} catch (error) {
							console.log(error);
						}
					} else {
						console.log(2, user);
						res.render("login_and_signup", { status: "user exists" });
					}
				});
			} else {
				res.render("login_and_signup", {
					msg: "password not match",
					msgClass: "is-danger",
				});
			}
		}
	);
	/**
	 * logout function
	 * @param  {Request} req - get token from cookie
	 * @param  {Response} res -  response ok and redirect
	 */
	router.get("/logout", (req, res) => {
		res.clearCookie("jwt");
		res.status(204).redirect("/");
	});

	return router;
};
