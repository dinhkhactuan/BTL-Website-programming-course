const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();

// const passport = require("passport");
// const FacebookStrategy = require("passport-facebook").Strategy;
// const session = require("express-session");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 3000;
const routs = require("./routers");
const db = require("./config/db");
// const dotenv = require("dotenv");
// dotenv.config({ path: "./.env" });

db.connect();
app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
//http
app.use(morgan("combined"));
//engine
// app.use(passport.initialize());

app.use(cookieParser());
// app.use(
//   session({
//     secret: "keyboard cat",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false },
//   })
// );
//set up

// passport.serializeUser(function (user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function (user, done) {
//   done(null, user);
// });

//login facebook
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: "273711807892143",
//       clientSecret: "a7114503bb45a3d1e2bdca3ef466ed5f",
//       callbackURL:
//         "https://4176-2405-4802-40ea-a940-1427-f5a6-4779-5177.ngrok.io/auth/facebook/callback",
//       profileFields: ["id", "displayName", "photos", "email"],
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       console.log(profile);
//       return cb(null, profile);
//     }
//   )
// );

app.enable("trust proxy");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "resources/view"));

// app.set('trust proxy', 1) // trust first proxy

routs(app);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
