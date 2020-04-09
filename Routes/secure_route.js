const express = require("express");
const router = express.Router();

module.exports = (user) => {
	router.get("/", (req, res) => {
		const user_name = req.user.name;
		const is_admin = req.user.role;
		if (is_admin == "admin") {
			res.redirect("/admin/a");
		} else if (is_admin == "premium") {
			res.render("premium", {
				elem: req.user,
				name: `Welcome user: ${user_name}`,
			});
		} else {
			res.render("normal", {
				elem: req.user,
				name: `Welcome user: ${user_name}`,
			});
		}
	});

	router.get("/go_back", (req, res) => {
		res.redirect("/secure");
	});

	router.post("/user_info", (req, res) => {
		const id = req.body.user_id;
		user.find({ _id: id }).then((elem) => {
			const user = elem[0];
			res.render("userSetting", { elem: user });
		});
	});

	router.post("/update_user", async (req, res) => {
		const { id, name, dietary, prefer } = req.body;
		await user.findOneAndUpdate(
			{ _id: id },
			{
				$set: {
					name: name,
					dietary: dietary,
					prefer_food: prefer,
				},
			},
			{ upsert: true },
			function (err) {
				if (err) return console.error(err);
				res.send("Profile Update!");
			}
		);
	});

	router.get("/mealplan", (req, res) => {
		res.render("meal_plan", { elem: req.user });
	});

	router.get("/view_recipe", (req, res) => {
		res.render("pricing", {
			elem: req.user.role,
			error: "Oops! It seems like you are not a Premium user",
		});
	});

	router.get("/pricing", (req, res) => {
		res.render("pricing", { elem: req.user });
	});

	router.get("/payment_page", (req, res) => {
		res.render("payment", { elem: req.user });
	});

	return router;
};
