const express = require("express");
const router = express.Router();
const urirest = require("unirest");
require("dotenv").config();

module.exports = () => {
  router.post("/getinfo", (req, res) => {
    urirest
      .get(process.env.API_ADDERSS)
      .query(req.body)
      .header({
        "x-rapidapi-host": process.env.API_HOST,
        "x-rapidapi-key": process.env.API_KEY
      })
      .then(elm => {
        if (elm.body.hits.length != 0) {
          const tag = elm.body.hits;
          res.send(tag);
        } else {
          res.send("i am not ok");
        }
      })
      .catch(err => {
        res.status(500).send(`API ERROR ${err.message}`);
      });
  });
  return router;
};
