const jwt = require("jsonwebtoken");
require("dotenv").config();
function generateToken(user) {
  let token = jwt.sign(JSON.parse(user), process.env.JWT, {
    expiresIn: 604800 // 1 week
  });
  return token;
}

module.exports = { generateToken };
