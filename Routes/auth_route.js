const express = require("express");
const passport = require("../middleware/passport");
const bcrypt = require("bcryptjs");
const authController = require("../controller/authController");

const router = express.Router();

module.exports = (users) => {
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
              delete user.password; // del pw from token
              const payload = JSON.stringify(user);
              const token = authController.generateToken(payload);
              res
                .cookie("jwt", { user: user, token: token })
                .render("protected", {
                  msg: `Welcome user: ${user.name}`,
                  msgClass: "alert-success"
                });
            });
          }
        )(req, res, next);
      }
    });
  });

  // signup
  router.post("/JKp7DeJXgaFtxaJ7FTXb", async (req, res) => {
    const { nickname, signupUser, signupPw, confirm_signupPw } = req.body;
    if (signupPw == confirm_signupPw) {
      users.findOne({ email: signupUser }, async (err, user) => {
        if (!user) {
          try {
            const pwHash = await bcrypt.hash(signupPw, 5);
            await users
              .create({
                name: nickname,
                email: signupUser,
                password: pwHash
              })
              .then(async user => {
                delete user._doc.password;
                const token = await authController.generateToken(
                  JSON.stringify(user)
                );
                res.cookie("jwt", token).render("protected", {
                  msg: `Welcome user: ${nickname}`,
                  msgClass: "alert-success"
                });
              });
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log(2, user);
          res.render("login", { status: "user exists" });
        }
      });
    } else {
      res.render("signup", {
        msg: "password not match",
        msgClass: "alert-danger"
      });
    }
  });

  router.get("/logout", (req, res) => {
    res.clearCookie("jwt");
    res.status(204).redirect("/");
  });

  return router;
};
