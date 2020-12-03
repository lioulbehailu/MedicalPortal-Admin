const passportJWT = require("passport-jwt");

const JWTStrategy = passportJWT.Strategy;
const { ExtractJwt } = passportJWT;

const Doctor = require("../models/doctor");
const Hospitals = require("../models/hospital");

const { jwtSecret } = require("./keys");

const doctorJwt = new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("jwt"),
    secretOrKey: jwtSecret,
  },
  (jwtPayload, done) => {
    Doctor.findOne({ _id: jwtPayload.user._id }, (err, user) => {
      if (err) {
        return done(true, null);
      } else {
        return done(false, user);
      }
    });
  }
);
const hospitalJwt = new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("jwt"),
    secretOrKey: jwtSecret,
  },
  (jwtPayload, done) => {
    Hospitals.findOne({ _id: jwtPayload.user._id }, (err, user) => {
      if (err) {
        return done(true, null);
      } else {
        return done(false, user);
      }
    });
  }
);

module.exports = {
  doctorJwt,
  hospitalJwt,
};
