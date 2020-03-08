const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("./middleware/passport");
const session = require("express-session");
const app = express();

require("dotenv").config();
const indexPage = __dirname + "/layout/index.html";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use("/Src/index.js", express.static("./Src/index.js"));
app.use("/Src/user_ajax.js", express.static("./Src/user_ajax.js"));

app.set("view engine", "ejs");
app.get("/", (req, res) => { res.status(200).sendFile(indexPage) });

// edamam
const api_route = require("./Routes/api_route")();
app.use("/api", api_route);

// sheet.best
const index_route = require("./Routes/index_route")();
app.use("/user", index_route);

// login
const auth_route = require("./Routes/auth_route");
app.use("/login", auth_route);

// secure
const secure_route = require("./Routes/secure_route");
app.use("/secure", secure_route);

module.exports = { app };
