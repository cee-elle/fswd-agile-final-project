const express = require("express");
const router = express.Router();
const urirest = require("unirest");

/**
 * Generates and sends AJAX GET request to API
 * @param {Object} apiReq API query object
 * @param {Object} res HTTP response object
 */
function urirestGet(apiReq, res) {
	urirest
		.get(process.env.API_ADDRESS)
		.query(apiReq)
		.header({
			"x-rapidapi-host": process.env.API_HOST,
			"x-rapidapi-key": process.env.API_KEY,
		})
		.then((elm) => {
			// checks for api response
			let hits = 0;
			try {
				hits = elm.body.hits.length;
				if (hits > 0) {
					const tag = elm.body.hits;
					res.send(tag);
				} else {
					res.send("No results found"); // error page?
				}
			} catch (err) {
				console.error(err);
			}
		})
		.catch((err) => {
			res.status(500).send(`API ERROR ${err.message}`);
		});
}

/**
 * Generates calorie range and appends it to API query object
 * @param {Object} apiReq API query object
 * @param {Object} req HTTP request object
 */
function caloriesRounder(apiReq, req) {
	// need a notification for incorrect user input
	if (req.body.calories != undefined && !isNaN(parseInt(req.body.calories))) {
		apiReq.calories =
			String(Math.round(Math.abs(parseInt(req.body.calories) * 0.9))) +
			"-" +
			String(Math.round(Math.abs(parseInt(req.body.calories) * 1.1)));
	}
}

module.exports = () => {
	// premium api query
	router.post("/getinfo", (req, res) => {
		const apiReq = {
			q: req.body.q,
			from: 0,
			to: 30,
		};

		caloriesRounder(apiReq, req);
		urirestGet(apiReq, res);
	});

	// free api query
	router.post("/getinfo_normal", (req, res) => {
		const apiReq = {
			q: req.body.q,
			from: 0,
			to: 30,
		};
		let num1 = Math.round(Math.random() * 30);
		let num2 = Math.round(Math.random() * 30);
		let num3 = Math.round(Math.random() * 30);

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
						const tag = [
							elm.body.hits[num1],
							elm.body.hits[num2],
							elm.body.hits[num3],
						];
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
		return urirest.get(url).query(query).headers({
			"x-rapidapi-host": process.env.SPOONACULAR_HOST,
			"x-rapidapi-key": process.env.SPOONACULAR_API,
		});
	};

	router
		.route("/spoonacular")
		.get((req, res) => {
			res.redirect("/secure");
		})
		.post((req, res) => {
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
				number: "50",
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
					let results = [];
					let length = data.body.results.length;
					console.log(length);
					if (length > 15) {
						length = 15;
					} else {
						length = length;
					}
					for (let i = 0; i < length; i++) {
						results.push(data.body.results[Math.floor(Math.random() * length)]);
					}
					res.render("premium", {
						id: req.user._id,
						elem: req.user,
						msg: [...new Set(results)],
					});
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
				res.send({ info: data.body[0].steps, _id: id });
			})
			.catch((err) => {
				console.log(err.message);
			});
	});

	router.post("/spoonacular_summary", (req, res) => {
		const id = req.body.food_id;
		const summary_url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/summary`;
		urirest
			.get(summary_url)
			.headers({
				"x-rapidapi-host": process.env.SPOONACULAR_HOST,
				"x-rapidapi-key": process.env.SPOONACULAR_API,
			})
			.then((data) => {
				res.send({ info: data.body });
			})
			.catch((err) => {
				console.log(err.message);
			});
	});

	router
		.route("/meal_planning")
		.get((req, res) => {
			res.redirect("/secure/mealplan");
		})
		.post((req, res) => {
			const url =
				"https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate";

			spoonacular_request(url, {
				timeFrame: "day",
				targetCalories: "2000",
				diet: "vegetarian",
				exclude: "shellfish%2C olives",
			})
				.then((data) => {
					// res.send({ info: data.body });
					res.render("meal_plan", {
						elem: req.user,
						info: data.body,
					});
				})
				.catch((err) => {
					console.log(err.message);
				});
		});

	return router;
};
