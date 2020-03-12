const express = require("express");
const passport = require("../middleware/passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authController = require("../controller/authController");

const router = express.Router();

module.exports = (db, users) => {
  router.get("/", (req, res) => {
    return res.render("login");
  });

  // login
  router.post("/gNQu5jGgxPL42r8g5zm6", (req, res, next) => {
    //req.body.loginUser
    users.findOne({ email: req.body.loginUser }, async (err, user) => {
      if (!user) {
        res.status(500).send("you are not a user");
      } else {
        passport.authenticate(
          "local",
          { session: false },
          async (err, user, info) => {
            if (err || !user) {
              console.log(err, user);
              return res.status(400).json({
                message: info.message ? info.message : "Login Failed"
              });
            }
            req.login(user, { session: false }, async err => {
              if (err) {
                res.send(err.message);
              }
              const payload = JSON.stringify(user);
              const token = authController.generateToken(payload);
              res.cookie("jwt", token).render("protected", { msg: "Success" });
            });
          }
        )(req, res, next);
      }
    });
  });

  // signup
  router.post("/JKp7DeJXgaFtxaJ7FTXb", async (req, res) => {
    users.findOne({ email: req.body.signupUser }, async (err, user) => {
      if (!user) {
        try {
          const pwHash = await bcrypt.hash(req.body.signupPw, 5);
          await users
            .create({
              name: null,
              email: req.body.signupUser,
              password: pwHash
            })
            .then(async user => {
              delete user._doc.password;
              const token = await authController.generateToken(
                JSON.stringify(user)
              );
              res.cookie("jwt", token).render("protected", { msg: "Success" });
            });
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log(2, user);
        res.render("login", { status: "user exists" });
      }
    });
  });

  router.get("/logout", (req, res) => {
    res.clearCookie("jwt");
    res.status(204).redirect("/");
  });

  return router;
};
