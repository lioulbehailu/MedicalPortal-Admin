const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const config = require("./config/database");
const connect = require("./config/index");
require("./passport")(passport);

const adminPage = require("./routes/admin");
const hospitalPage = require("./routes/hospital");
const doctorPage = require("./routes/doctor");
const { jwtSecret, jwtExpire } = require("./config/keys");

const Doctor = mongoose.model("Doctor");
const Hospital = mongoose.model("Hospital");

// setup database connection
mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

connect.connect();
let db = mongoose.connection;

//check connection
db.once("open", function () {
  console.log("Connected to MongoDB");
  console.log(db.name);
});

//check for db errors
db.on("error", function (err) {
  console.log(err);
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

const hosAuthMiddleware = (req, res, next) => {
  passport.authenticate(
    "hospital-jwt",
    { session: false },
    (error, user, message) => {
      if (error || !user) {
        if (!message) {
          message = { message: "No Hospital Found with this token" };
        } else if (Object.keys(message).length <= 0) {
          message = { message: "No Auth token Provided" };
        }
        console.log(error);
        res.status(401).send(message);
      } else if (user) {
        req.user = user;
        next();
      }
    }
  )(req, res, next);
};

const docAuthMiddleware = (req, res, next) => {
  passport.authenticate(
    "doctor-jwt",
    { session: false },
    (error, user, message) => {
      if (error || !user) {
        if (!message) {
          message = { message: "No Doctor Found with this token" };
        } else if (Object.keys(message).length <= 0) {
          message = { message: "No Auth token Provided" };
        }
        console.log(error);
        res.status(401).send(message);
      } else if (user) {
        req.user = user;
        next();
      }
    }
  )(req, res, next);
};

let =
  // Login Route
  app.post("/api/:actor/login", async (req, res) => {
    const { email, password } = req.body;

    try {
      const userModel =
        req.params.actor === "doctor"
          ? await Doctor.findOne({ email })
          : await Hospital.findOne({ email });

      if (!userModel) {
        return res.status(401).json({
          errorMsg: "Invalid Credentials",
        });
      }
      const isMatch = await bcrypt.compare(
        password,
        userModel.encryptedPassword
      );

      if (!isMatch) {
        return res.status(401).json({
          errorMsg: "Invalid Credentials",
        });
      }

      // Create the JWT payload
      const payload = {
        user: {
          _id: userModel._id,
        },
      };

      await jwt.sign(
        payload,
        jwtSecret,
        { expiresIn: jwtExpire },
        (err, token) => {
          if (err) {
            res.status(500).json({ errorMsg: "Internal Error Occured" });
          } else {
            res.status(200).json({ token, role: userModel.role });
          }
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).json({
        errorMsg: "Server Error",
      });
    }
  });

app.use("/admin", adminPage);
app.use("/api/hospital", hosAuthMiddleware, hospitalPage);
app.use("/api/doctor", docAuthMiddleware, doctorPage);

app.listen(4000, () => console.log("Server started on port 4000..."));

module.exports = app;
