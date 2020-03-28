const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

module.exports = users => {
  // loads all user info from db for admin
  router.get("/a", (req, res) => {
    users.find().then(elem => {
      res.render("admin", { elem });
    });
  });

  // sheets best, no longer used
  router.post("/a", (req, res) => {
    const data = [req.body];
    fetch(process.env.SHEET_BEST, {
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

  // updates user info on db
  router.post("/update", async (req, res) => {
    const { id, role, name, email, dietary, prefer } = req.body;
    await users.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          role: role,
          name: name,
          email: email,
          dietary: dietary,
          prefer_food: prefer
        }
      },
      { upsert: true },
      function(err) {
        if (err) return console.error(err);
        res.status(200).send("Profile Update!");
      }
    );
  });

  // delete user from db
  router.post("/delete", (req, res) => {
    const { id } = req.body;
    users.deleteOne({ _id: id }, err => {
      if (err) return console.error(err);
      res.status(200).send("User successfully removed from polls collection!");
    });
  });

  router.get("/normal", (req, res) => {
    res.render("normal");
  });

  router.get("/premium", (req, res) => {
    res.render("premium");
  });

  return router;
};
