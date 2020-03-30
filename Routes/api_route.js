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
      "x-rapidapi-key": process.env.API_KEY
    })
    .then(elm => {
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
    .catch(err => {
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
      to: 30
    };

    caloriesRounder(apiReq, req);
    urirestGet(apiReq, res);
  });

  // free api query
  router.post("/getinfo_normal", (req, res) => {
    const apiReq = {
      q: req.body.q,
      from: 0,
      to: 3
    };

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
		unirest
			.get(summary_url)
			.then((data) => {
				console.log(data.body);
				res.send({ info: data.body.summary });
			})
			.catch((err) => {
				console.log(err.message);
			});
	});

	return router;
};
