const express = require("express");
// const urirest = require("unirest");
const fetch = require("node-fetch");
const { verifyToken } = require("../controller/authController");
const SHEET_BEST = process.env.SHEET_BEST;
const router = express.Router();


module.exports = (users) => { //users

  router.get("/a", (req, res) => {
    if ("jwt" in req.cookies) {
      try {
        if (verifyToken(req.cookies.jwt.token)) {
          users.find().then(elem => { 
            res.render("admin", { elem })
          })

            // urirest
            //   .get(SHEET_BEST)
            //   .then(elem => {
            //     res.render("admin", { elem });
            //   })
            .catch(err => {
              console.log(err);
              res.send({ msg: "error" });
            });
        }
      } catch (err) { console.log(err) }
    } else {
      res.render("Dash", { msg: "bad token" });
    }
  });


  // TODO
  router.post("/a", (req, res) => {
    const data = [req.body];
    // console.log(data);
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
