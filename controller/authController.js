const jwt = require("jsonwebtoken");
require("dotenv").config();
function generateToken(user) {
  let token = jwt.sign(JSON.parse(user), process.env.JWT, {
    expiresIn: 604800 // 1 week
  });
  return token;
}

function verifyToken(token) {
  const state = jwt.verify(token, process.env.JWT, function (err) {
    if (err) {
      console.log(err);
      return false;
    }
    return true
  });
  return state
}

module.exports = { generateToken, verifyToken };
