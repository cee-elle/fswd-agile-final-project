const express = require("express"),
	session = require("express-session"),
	bodyParser = require("body-parser"),
	cookieParser = require("cookie-parser"),
	passport = require("./middleware/passport"),
	app = express();

module.exports = (db, users) => {
	app.use(express.static("Public"));
	app.set("view engine", "ejs");
	app.use(
		session({
			secret: process.env.SESSION_SECRET,
			resave: false,
			saveUninitialized: false
		})
	);
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	app.use(cookieParser());

	// home
	const index_route = require("./Routes/index_route.js")();
	app.use("/", index_route);

	// edamam
	const api_route = require("./Routes/api_route")();
	app.use("/api", api_route);

	// sheet.best
	const admin_route = require("./Routes/admin_route")(users);
	app.use("/admin", admin_route);

	// login
	const auth_route = require("./Routes/auth_route")(users);
	app.use("/user", auth_route);

	// secure
	const secure_route = require("./Routes/secure_route")();
	app.use(
		"/secure",
		passport.authenticate("jwt", { session: false }),
		secure_route
	);
	return app;
};
