const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

const indexPage = __dirname + "/index.html";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());


app.post("/", (req, res) => {
  // ajax request body
  const body = req.body;


  // res.sendFile(indexPage);
  res.status(200).send("Post request OK");
});


app.get("/", (req, res) => {
  // res.sendFile(indexPage);
  res.status(200).send("Get request OK")
});

module.exports = { app };