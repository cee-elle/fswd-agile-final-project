const express = require("express");
const urirest = require("unirest");
const fetch = require("node-fetch");
const SHEET_BEST = process.env.SHEET_BEST;
const router = express.Router();


module.exports = () => { //users

  router.get("/a", (req, res) => { 
    urirest
      .get(SHEET_BEST)
      .then(elem => {
        res.render("admin", { elem });
      })
      .catch(err => {
        console.log(err);
        res.send({ msg: "sheet.best error" });
      });
  });

  router.post("/a", (req, res) => {
    const data = [req.body];
    console.log(data);
    fetch(SHEET_BEST, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(r => r.json())
      .then(data => {
        res.send(data);
      })
      .catch(error => {
        res.status(500).send(`${error.message}🤦🏻`);
      });
  });

  return router;
};
