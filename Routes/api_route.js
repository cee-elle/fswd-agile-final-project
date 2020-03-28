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

    caloriesRounder(apiReq, req);
    urirestGet(apiReq, res);
  });
  return router;
};
