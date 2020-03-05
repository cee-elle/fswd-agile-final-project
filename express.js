const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const indexPage = __dirname + "/layout/index.html";
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/Src/index.js", express.static("./Src/index.js"));
app.use("/Src/user_ajax.js", express.static("./Src/user_ajax.js"));

app.set("view engine", "ejs");

const api_route = require("./Routes/api_route")();
app.use("/api", api_route);

app.get("/", (req, res) => {
	res.status(200).sendFile(indexPage);
});
const index_route = require("./Routes/index_route")();
app.use("/user", index_route);

module.exports = { app };
