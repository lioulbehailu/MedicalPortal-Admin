const express = require("express");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const router = express.Router();
const bcrypt = require("bcryptjs");

const Doctor = require("../models/doctor");
const Patients = require("../models/patients");

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

router.post("/update-profile", async (req, res) => {
  const { _id, ...rest } = req.body;

  if (rest.password) {
    rest.encryptedPassword = await bcrypt.hash(rest.password, 10);
    delete rest.password;
  }

  Doctor.findOneAndUpdate({ _id: ObjectId(_id) }, { $set: rest }).exec(
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

router.post("/searchpatient", (req, res) => {
  const { searchForm } = req.body;

  // Do a MongoDb Query

  if (searchForm.gender === "male") {
    searchForm.gender = "M";
  } else if (searchForm.gender === "female") {
    searchForm.gender = "F";
  }

  searchForm.age ? parseInt(searchForm.age, 10) : "";

  Patients.find(searchForm).exec((err, data) => {
    if (err) {
      res.status(err.status || 500).json({
        error: "Internal Error Occured",
      });
    }

    res.status(200).json({
      data,
    });
  });
});

module.exports = router;
