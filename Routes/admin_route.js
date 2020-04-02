const express = require("express");
const router = express.Router();

module.exports = (users) => {
	// loads all user info from db for admin
	router.get("/a", (req, res) => {
		users.find().then((elm) => {
			res.render("admin", { elm, elem: req.cookies.jwt.user });
		});
	});

	router.get("/p", (req, res) => {
		users.find({ role: "premium" }).then((elm) => {
			res.render("admin", { elm, p: "p" });
		});
	});

	router.get("/n", (req, res) => {
		users.find({ role: "normal" }).then((elm) => {
			res.render("admin", { elm, n: "n" });
		});
	});

	// updates user info on db
	router.post("/update", async (req, res) => {
		const { id, role, name, email, dietary, prefer } = req.body;
		await users.findOneAndUpdate(
			{ _id: id },
			{
				$set: {
					role: role,
					name: name,
					email: email,
					dietary: dietary,
					prefer_food: prefer,
				},
			},
			{ upsert: true },
			function(err) {
				if (err) return console.error(err);
				res.status(200).send("Profile Update!");
			}
		);
	});

	//update
	router.post("/update", async (req, res) => {
		const { id, role, name, email, dietary, prefer } = req.body;
		console.log(id);
		await users.findOneAndUpdate(
			{ _id: id },
			{
				$set: {
					role: role,
					name: name,
					email: email,
					dietary: dietary,
					prefer_food: prefer,
				},
			},
			{ upsert: true },

			function(err) {
				//function(err, user) {
				if (err) return console.error(err);
				console.log("Profile Update!");
				res.status(200).send("Profile Update!");
			}
		);
	});

	//delete
	router.post("/delete", (req, res) => {
		console.log("User successfully removed from polls collection!");
		res.status(200).send("User successfully removed from polls collection!");
	});

	router.get("/premium", (req, res) => {
		res.render("premium", { elem: req.cookies.jwt.user });
	});

	router.get("/normal", (req, res) => {
		res.render("normal", { elem: req.cookies.jwt.user });
	});

	return router;
};
