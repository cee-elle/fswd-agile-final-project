const express = require("express");
const router = express.Router();

module.exports = () => {
	router.get("/", (req, res) => {
		res.render("Dash", { msg: req.flash("msg") });
	});

	router.get("/login_and_signup", (req, res) => {
		if (req.cookies.jwt) {
			res.redirect("/secure");
		} else {
			res.render("login_and_signup");
		}
	});

	return router;
};
