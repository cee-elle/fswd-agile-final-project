const express = require("express");
const passport = require("../middleware/passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

// router.get("/test", (req, res) => {
//   passport.authenticate("local", (err, ))
// })

router.post("/test", (req, res) => {
  passport.authenticate("local", (err, account, msg) => {
    if (err) {
      return res.status(400).json({
        message: msg ? msg : "something went wrong"
      })
    }
    req.login(account, (err) => {
      if (err) {
        res.send(err);
      }
      const payload = JSON.stringify(account);
      const token = jwt.sign(payload, "TOP SECRET");
      return res.json({ user, token });
    })
  })(req, res)
});

router.get("/test", (req, res) => {
  passport.authenticate("local", (err, account, msg) => {
    if (err) {
      return res.status(400).json({
        message: msg ? msg : "something went wrong"
      })
    }
    req.login(account, (err) => {
      if (err) {
        res.send(err);
      }
      const payload = JSON.stringify(account);
      const token = jwt.sign(payload, "TOP SECRET");
      return res.json({ user, token });
    })
  })(req, res)
});

module.exports = router;