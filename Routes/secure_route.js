const express = require("express");
const router = express.Router();

module.exports = () => {
  router.get("/", (req, res) => {
    const user_name = req.cookies.jwt.user.name;
    res.render("protected", {
      msg: `Welcome user: ${user_name}`,
      msgClass: "alert-success"
    });
  });

  return router;
};
