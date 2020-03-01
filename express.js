const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const indexPage = __dirname + "/layout/index.html";
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/Src/index.js", express.static("./Src/index.js"));

const api_route = require("./Routes/api_route")();
app.use("/api", api_route);

app.get("/", (req, res) => {
  res.status(200).sendFile(indexPage);
});

module.exports = { app };
