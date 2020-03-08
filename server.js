require("dotenv").config();
const express = require("./express")();
const PORT = process.env.PORT || 8888;

express.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});
