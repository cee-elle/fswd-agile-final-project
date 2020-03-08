const express = require("express");
const passport = require("../middleware/passport");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

router.get("/", (req, res) => {
  passport.authenticate("jwt", (err, user, msg) => {
    if (err) {
      return res.status(400).json({
        message: msg ? msg : "something went wrong"
      })
    }
    req.login(user, (err) => {
      if (err) {
        res.send(err);
      }
      const payload = JSON.stringify(user);
      const token = jwt.sign(payload, process.env.JWT);
      return res.cookie("jwt", token).send("jwt ok");
    })
  })(req, res) 
  res.render("index");
});

module.exports = router;