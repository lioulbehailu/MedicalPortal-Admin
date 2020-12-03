const express = require("express");
const router = express.Router();

router.get("/home", (req, res) => {
  const {
    _id,
    email,
    HospitalName,
    username,
    address,
    patients_API,
    doctor_API,
  } = req.user;

  res.status(200).json({
    hospitalProfile: {
      _id,
      email,
      HospitalName,
      username,
      address,
      patients_API,
      doctor_API,
    },
  });
});

router.post("/update-profile", (req, res) => {
  console.log(req.body);
  // res.status(200).json({ message: "Hospital Homepage" });
});

module.exports = router;
