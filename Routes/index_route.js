const express = require("express");
const router = express.Router();

module.exports = () => {
	router.get("/", (req, res) => {
		res.render("Dash", { msg: req.flash("msg") });
	});
	router.get("/login_and_signup", (req, res) => {
		res.render("login_and_signup");
	});

	router.get("/signup", (req, res) => {
		res.render("signup");
	});

	return router;
};
