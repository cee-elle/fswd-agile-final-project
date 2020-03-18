require("dotenv").config();
const db = require("./DB_modules/DB");
const users = require("./DB_modules/user");
const express = require("./app")(db, users);
const PORT = process.env.PORT || 8888;

express.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});
