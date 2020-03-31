const express = require("express");
const router = express.Router();
const urirest = require("unirest");

module.exports = () => {
	router.post("/getinfo", (req, res) => {
		// req obj for passing params to api
		const apiReq = {
			q: req.body.q,
			from: 0,
			to: 30,
		};

		if (req.body.calories != undefined) {
			apiReq.calories =
				String(Math.round(Math.abs(parseInt(req.body.calories) * 0.9))) +
				"-" +
				String(Math.round(Math.abs(parseInt(req.body.calories) * 1.1)));
		}

		urirest
			.get(process.env.API_ADDRESS)
			.query(apiReq)
			.header({
				"x-rapidapi-host": process.env.API_HOST,
				"x-rapidapi-key": process.env.API_KEY,
			})
			.then((elm) => {
				// length of undefined
				let hits = 0;
				try {
					hits = elm.body.hits.length;
					if (hits != 0) {
						const tag = elm.body.hits;
						res.send(tag);
					} else {
						res.send("i am not ok");
					}
				} catch (err) {
					console.log(err);
				}
			})
			.catch((err) => {
				res.status(500).send(`API ERROR ${err.message}`);
			});
	});

	router.post("/getinfo_normal", (req, res) => {
		// req obj for passing params to api
		const apiReq = {
			q: req.body.q,
			from: 0,
			to: 3,
		};

		if (req.body.calories != undefined) {
			apiReq.calories =
				String(Math.round(Math.abs(parseInt(req.body.calories) * 0.9))) +
				"-" +
				String(Math.round(Math.abs(parseInt(req.body.calories) * 1.1)));
		}

		urirest
			.get(process.env.API_ADDRESS)
			.query(apiReq)
			.header({
				"x-rapidapi-host": process.env.API_HOST,
				"x-rapidapi-key": process.env.API_KEY,
			})
			.then((elm) => {
				// length of undefined
				let hits = 0;
				try {
					hits = elm.body.hits.length;
					if (hits != 0) {
						const tag = elm.body.hits;
						res.send(tag);
					} else {
						res.send("i am not ok");
					}
				} catch (err) {
					console.log(err);
				}
			})
			.catch((err) => {
				res.status(500).send(`API ERROR ${err.message}`);
			});
	});

	const return_null = (str) => {
		let is_null = "";
		try {
			is_null = str.toString();
		} catch (err) {
			is_null = "";
		}
		return is_null;
	};

	const spoonacular_request = (url, query) => {
		return urirest
			.get(url)
			.query(query)
			.headers({
				"x-rapidapi-host": process.env.SPOONACULAR_HOST,
				"x-rapidapi-key": process.env.SPOONACULAR_API,
			});
	};

	router.post("/spoonacular", (req, res) => {
		const {
			query,
			calorie,
			include,
			exclude,
			intolerances,
			health,
			type,
		} = req.body;
		const allergy = return_null(intolerances);
		const diet = return_null(health);
		const dish = return_null(type);

		//test whether the backend have the data
		// console.log(req.body);
		// console.log(query, calorie, include, exclude, allergy, diet, dish);

		spoonacular_request(process.env.SPOONACULAR_COMPLEX_ADDRESS, {
			offset: "0",
			number: "10",
			maxCalories: calorie || "400",
			diet: diet,
			includeIngredients: include || "",
			excludeIngredients: exclude || "",
			intolerances: allergy,
			type: dish,
			instructionsRequired: "true",
			query: query,
		})
			.then((data) => {
				console.log(data.body.results[0]);
				res.render("premium", { msg: data.body.results });
			})
			.catch((err) => {
				console.log(err.message);
			});
	});

	router.post("/spoonacular_instruction", (req, res) => {
		console.log(req.body);
		const id = req.body.food_id;
		const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/analyzedInstructions`;
		spoonacular_request(url, {
			stepBreakdown: "True",
		})
			.then((data) => {
				console.log(data.body);
				res.send({ info: data.body[0].steps, _id: id });
			})
			.catch((err) => {
				console.log(err.message);
			});
	});

	router.post("/spoonacular_summary", (req, res) => {
		console.log(req.body);
		const id = req.body.food_id;
		const summary_url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/summary`;
		urirest
			.get(summary_url)
			.headers({
				"x-rapidapi-host": process.env.SPOONACULAR_HOST,
				"x-rapidapi-key": process.env.SPOONACULAR_API,
			})
			.then((data) => {
				console.log(data.body);
				res.send({ info: data.body });
			})
			.catch((err) => {
				console.log(err.message);
			});
	});

	return router;
};
