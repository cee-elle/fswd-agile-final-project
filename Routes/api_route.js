const express = require("express");
const router = express.Router();
const urirest = require("unirest");

module.exports = () => {
  router.post("/getinfo", (req, res) => {
    // req obj for passing params to api
    const apiReq = {
      q: req.body.q,
      from: 0,
      to: 30
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
        "x-rapidapi-key": process.env.API_KEY
      })
      .then(elm => {
        // length of undefined
        hits = 0;
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
      .catch(err => {
        res.status(500).send(`API ERROR ${err.message}`);
      });
  });
  return router;
};
