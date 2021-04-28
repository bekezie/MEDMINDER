const express = require("express");
require("dotenv").config();
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
//route imports
const authRouter = require("./routes/auth");
const medicineRouter = require("./routes/medicineData");
const profileRouter = require("./routes/profileData");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "frontend/build")));

const DB_NAME = "MediMindDB";

app.use(
  session({
    // session tokens are pretty much cookies for the backend. it allows us to track whether the user is logged in. we will store our session tokens in mongodb
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // this store property is how we are binding the session data to the DB
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      dbName: DB_NAME,
      collection: "sessions",
    }),
    cookie: {
      maxAge: 7 * 1000 * 60 * 60 * 25, //cookies will last a week before requiring a re-login
    },
  })
);

// this require call will run the code that configures the passport local strategy
require("./auth/passportConfig");
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);
app.use("/medicineData", medicineRouter);
app.use("/profileData", profileRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
});

module.exports = app;
