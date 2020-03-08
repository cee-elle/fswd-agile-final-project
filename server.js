const express = require("./express");

require("dotenv").config();
const PORT = process.env.PORT || 8888;

express.app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});
