const { doctorJwt, hospitalJwt } = require("./config/passportJwt");

module.exports = function (passport) {
  passport.use("doctor-jwt", doctorJwt);
  passport.use("hospital-jwt", hospitalJwt);
};
