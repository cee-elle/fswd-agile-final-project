const express = require("express");
const router = express.Router();

module.exports = (user) => {
	router.get("/", (req, res) => {
		const user_name = req.cookies.jwt.user.name;
		const is_admin = req.cookies["jwt"]["user"].role;
		if (is_admin == "admin") {
			res.redirect("/admin/a");
		} else if (is_admin == "premium") {
			res.render("premium", {
				id: req.cookies.jwt.user._id,
				name: `Welcome user: ${user_name}`,
				msgClass: "alert-success",
			});
		} else {
			res.render("normal", {
				name: `Welcome user: ${user_name}`,
				msgClass: "alert-success",
			});
		}
	});

	router.get("/spoonacular", (req, res) => {
		res.render("premium");
	});

	router.post("/user_info", (req, res) => {
		const id = req.body.user_id;
		user.find({ _id: id }).then((elem) => {
			const user = elem[0];
			res.render("userSetting", { elem: user });
		});
	});

	return router;
};
