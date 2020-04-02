require("dotenv").config();
const express = require("express"),
	session = require("express-session"),
	cookieParser = require("cookie-parser"),
	passport = require("./middleware/passport"),
	flash = require("connect-flash"),
	sassMiddleware = require("node-sass-middleware"),
	helmet = require("helmet"),
	app = express();

module.exports = (db, users) => {
	app.use(express.static("Public"));
	app.set("view engine", "ejs");
	app.use(
		session({
			secret: process.env.SESSION_SECRET,
			resave: false,
			saveUninitialized: false,
		})
	);
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(express.urlencoded({ extended: false }));
	app.use(express.json());
	app.use(flash());
	app.use(cookieParser());
	app.use(helmet());
	app.use(
		sassMiddleware({
			src: `${__dirname}/public/sass`,
			dest: __dirname + "/public",
			debug: true,
		})
	);

	// home
	const index_route = require("./Routes/index_route.js")();
	app.use("/", index_route);

	// admin middleware
	app.use("/admin", (req, res, next) => {
		const is_admin = req.cookies.jwt.user.role;
		if (is_admin == "admin") {
			req.is_admin = true;
			next();
		} else {
			req.is_admin = false;
			next();
		}
	});

	app.use("/admin", (req, res, next) => {
		try {
			const is_admin = req.cookies.jwt.user.role;
			if (is_admin == "admin") {
				req.is_admin = true;
				next();
			} else {
				req.is_admin = false;
				next();
			}
		} catch (err) {
			req.is_admin = false;
			next();
		}
	});

	const is_admin = (req, res, next) => {
		if (req.is_admin) {
			next();
		} else {
			req.flash("msg", "you are not an admin user");
			res.redirect("/");
		}
	};

	// admin page
	const admin_route = require("./Routes/admin_route")(users);
	app.use("/admin", is_admin, admin_route);

	// auth route
	const auth_route = require("./Routes/auth_route")(users);
	app.use("/user", auth_route);

	// secure
	const secure_route = require("./Routes/secure_route")(users);

	const is_login = (req, res, next) => {
		passport.authenticate("jwt", { session: false }, (err, user, info) => {
			if (err) res.render("error");
			if (!user) {
				console.log(info);
				res.render("error");
			}
			next();
		})(req, res, next);
	};

	app.use("/secure", is_login, secure_route);

	// edamam api route
	const api_route = require("./Routes/api_route")();
	app.use("/api", is_login, api_route);

	app.get("/pricing", (req, res) => {
		res.render("pricing");
	});

	app.get("/normal_hr", (req, res) => {
		res.render("normal_hr");
	});

	app.get("/premium_hr", (req, res) => {
		res.render("premium_hr");
	});

	return app;
};
