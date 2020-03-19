const express = require("express");
const router = express.Router();

module.exports = () => {
	router.get("/", (req, res) => {
		const user_name = req.cookies.jwt.user.name;
		const is_admin = req.cookies["jwt"]["user"].role;
		if (is_admin == "admin") {
			res.redirect("/admin/a");
		} else {
			res.render("protected", {
				msg: `Welcome user: ${user_name}`,
				msgClass: "alert-success"
			});
		}
	});

	return router;
};
