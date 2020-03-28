const express = require("express");
const router = express.Router();

module.exports = () => {
	router.get("/", (req, res) => {
		const user_name = req.cookies.jwt.user.name;
		const is_admin = req.cookies["jwt"]["user"].role;
		if (is_admin == "admin") {
			res.redirect("/admin/a");
		} else if (is_admin == "premium") {
			res.render("premium", {
				msg: `Welcome user: ${user_name}`,
				msgClass: "alert-success",
			});
		} else {
			res.render("normal", {
				msg: `Welcome user: ${user_name}`,
				msgClass: "alert-success",
			});
		}
	});

	return router;
};
