const express = require("express");
const passport = require("../middleware/passport");
const bcrypt = require("bcryptjs");
const authController = require("../controller/authController");
const { check, validationResult, body } = require("express-validator");
const router = express.Router();

module.exports = users => {
  // login
  router.post("/gNQu5jGgxPL42r8g5zm6", (req, res, next) => {
    users.findOne({ email: req.body.loginUser }, async (err, user) => {
      if (!user) {
        res.render("login_and_signup", {
          msg: "You are not a user",
          msgClass: "is-danger"
        });
      } else {
        // passport local strategy to authenticate user login
        passport.authenticate(
          "local",
          { session: false },
          async (err, user, info) => {
            if (err || !user) {
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
                .redirect("/secure");
            });
          }
        )(req, res, next);
      }
    });
  });

  // signup
  router.post(
    "/JKp7DeJXgaFtxaJ7FTXb",
    [
      check("signupUser").isEmail(),
      check("signupPw")
        .isLength({ min: 10 })
        .withMessage("must be at least 10 characters long")
        .matches(/\d/)
        .withMessage("must contain a number")
    ],
    body("passwordConfirmation").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }

      // Indicates the success of this synchronous custom validator
      return true;
    }),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const { nickname, signupUser, signupPw, confirm_signupPw } = req.body;
      check("signupPw:").custom((signupPw, { req }) => {
        if (signupPw !== req.body.passwordConfirmation) {
          throw new Error("Password confirmation is incorrect");
        }
      });

      if (signupPw == confirm_signupPw) {
        users.findOne({ email: signupUser }, async (err, user) => {
          if (!user) {
            try {
              const pwHash = await bcrypt.hash(signupPw, 5);
              await users
                .create({
                  name: nickname,
                  email: signupUser,
                  password: pwHash,
                  role: "normal",
                  dietary: "none",
                  prefer_food: "none"
                })
                .then(async user => {
                  delete user._doc.password;
                  const token = await authController.generateToken(
                    JSON.stringify(user)
                  );
                  res
                    .cookie("jwt", { user: user, token: token })
                    .redirect("/secure");
                });
            } catch (error) {
              console.log(error);
            }
          } else {
            console.log(2, user);
            res.render("login_and_signup", { status: "user exists" });
          }
        });
      } else {
        res.render("login_and_signup", {
          msg: "password not match",
          msgClass: "is-danger"
        });
      }
    }
  );

  // logout
  router.get("/logout", (req, res) => {
    res.clearCookie("jwt");
    res.status(204).redirect("/");
  });

  return router;
};
