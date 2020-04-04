const jwt = require("jsonwebtoken");
require("dotenv").config();

// generate jwt
function generateToken(user) {
	let token = jwt.sign(JSON.parse(user), process.env.JWT, {
		expiresIn: "1hr",
	});
	return token;
}

// verify jwt
function verifyToken(token) {
	const state = jwt.verify(token, process.env.JWT, function(err) {
		if (err) {
			console.log(err);
			return false;
		}
		return true;
	});
	return state;
}

module.exports = { generateToken, verifyToken };
