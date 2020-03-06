const express = require("express");
const urirest = require("unirest");
const fetch = require("node-fetch");

const router = express.Router();

module.exports = () => {
	const url = `https://sheet.best/api/sheets/0921bc28-4dd1-4d39-9cab-637b86a30a77`;

	router
		.route("/a")
		.get((req, res) => {
			urirest
				.get(url)
				.then((elem) => {
					res.render("index", { elem });
				})
				.catch((err) => {
					console.log(err);
				});
		})
		.post((req, res) => {
			const data = [req.body];
			fetch(url, {
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
