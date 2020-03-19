const express = require("express");
// const urirest = require("unirest");
const fetch = require("node-fetch");
const router = express.Router();

module.exports = (users) => {
	//users

	router.get("/a", (req, res) => {
		users.find().then((elem) => {
			res.render("admin", { elem });
		});
	});

	// TODO
	router.post("/a", (req, res) => {
		const data = [req.body];
		// console.log(data);
		fetch(process.env.SHEET_BEST, {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
			.then((r) => r.json())
			.then((data) => {
				res.send(data);
			})
			.catch((error) => {
				res.status(500).send(`${error.message}🤦🏻`);
			});
	});

	return router;
};
