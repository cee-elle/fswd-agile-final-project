const indexPage = __dirname + "/layout/index.html";

const express = require("express"),
  session = require("express-session"),
  bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  passport = require("./middleware/passport"),
  app = express();

module.exports = () => {
  app.use("/Src/index.js", express.static("./Src/index.js"));
  app.use("/Src/user_ajax.js", express.static("./Src/user_ajax.js"));
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

  app.get("/", (req, res) => {
    res.status(200).sendFile(indexPage);
  });

  // edamam
  const api_route = require("./Routes/api_route")();
  app.use("/api", api_route);

  // sheet.best
  const index_route = require("./Routes/index_route")();
  app.use("/admin", index_route);

  // login
  const auth_route = require("./Routes/auth_route")();
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
