const express = require("./express");
const PORT = process.env.PORT || 8888;

express.app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});
