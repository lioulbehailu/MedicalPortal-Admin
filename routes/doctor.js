const express = require("express");
const router = express.Router();

router.get("/home", (req, res) => {
  const {
    _id,
    email,
    doctorName,
    username,
    address,
    hospitalInfo,
    role,
  } = req.user;
  res.status(200).json({
    docProfile: {
      _id,
      email,
      doctorName,
      username,
      address,
      hospitalInfo,
      role,
    },
  });
});

router.post("/update-profile", (req, res) => {
  console.log(req.body.data);
});

router.post("/searchpatient", (req, res) => {
  console.log(req.body.data);
});

module.exports = router;
