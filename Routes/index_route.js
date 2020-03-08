const express = require("express");
const urirest = require("unirest");
const fetch = require("node-fetch");

require("dotenv").config();
const router = express.Router();

module.exports = () => {
  const SHEET_BEST = process.env.SHEET_BEST;

  router
    .route("/a")
    .get((req, res) => {
      urirest
        .get(SHEET_BEST)
        .then((elem) => {
          res.render("index", { elem });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .post((req, res) => {
      const data = [req.body];
      fetch(SHEET_BEST, {
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
