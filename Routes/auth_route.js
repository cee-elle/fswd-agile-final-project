const express = require("express");
const passport = require("../middleware/passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { users, checkUsername } = require("../controller/userController");

const router = express.Router();

module.exports = () => {
  router.get("/", (req, res) => {
    return res.render("login");
  });

  // login
  router.post("/gNQu5jGgxPL42r8g5zm6", (req, res) => {
    passport.authenticate("local", { session: true }, (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: info ? info.message : "Login Failed"
        });
      }
      req.login(user, { session: false }, err => {
        if (err) {
          res.send(err);
        }
        const payload = JSON.stringify(user);
        const token = jwt.sign(payload, process.env.JWT);
        res.cookie("jwt", token).render("protected", { msg: "Success" });
      });
    })(req, res);
  });

  // signup
  router.post("/JKp7DeJXgaFtxaJ7FTXb", async (req, res) => {
    const exist = checkUsername(req.body.signupUser);
    if (!exist) {
      try {
        const pwHash = await bcrypt.hash(req.body.signupPw, 5);
        users.push({
          id: users.length + 1,
          username: req.body.signupUser,
          password: pwHash
        });
        console.log(users);
        res.send("signed up");
      } catch (error) {
        res.render("login", { status: "login error" });
      }
    } else {
      res.render("login", { status: "user exists" });
    }
  });

  router.get("/logout", (req, res) => {
    res.clearCookie("jwt");
    res.status(204).redirect("/");
  });

  return router;
};
