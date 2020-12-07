const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const bcrypt = require("bcryptjs");

const Hospital = require("../models/hospital");

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

router.post("/update-profile", async (req, res) => {
  const { _id, ...rest } = req.body.data;

  console.log(rest);

  if (rest.password) {
    rest.encryptedPassword = await bcrypt.hash(rest.password, 10);
    delete rest.password;
  }

  Hospital.findOneAndUpdate({ _id: ObjectId(_id) }, { $set: rest }).exec(
    (err, data) => {
      if (err) {
        res.status(err.status || 500).json({
          error: "Internal Error Occured",
        });
      }

      res.status(200).json({ data });
    }
  );
});

module.exports = router;
