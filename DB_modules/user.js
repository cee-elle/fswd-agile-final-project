const mongoose = require("mongoose");

// user document representation
const user_schema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
	role: String,
	dietary: String,
	prefer_food: String
});

mongoose.model("User", user_schema);

module.exports = mongoose.model("User");
