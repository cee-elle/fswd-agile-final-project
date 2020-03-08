const express = require("express");
const router = express.Router();
module.exports = () => {
  router.get("/", (req, res) => {
    res.render("protected", { msg: "i am you" });
  });

  return router;
};
