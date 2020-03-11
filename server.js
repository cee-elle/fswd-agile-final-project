require("dotenv").config();
const db = require("./controller/userController");
const express = require("./app")(db);
const PORT = process.env.PORT || 8888;

express.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});
