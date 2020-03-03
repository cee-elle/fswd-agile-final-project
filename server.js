const express = require("./express");
const PORT = 8888;


express.app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});