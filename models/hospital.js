const { Button } = require("admin-bro");
const mongoose = require("mongoose");

const HospitalSchema = mongoose.Schema({
  HospitalName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  encryptedPassword: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  patients_API: {
    type: String,
    required: true,
  },
  doctor_API: {
    type: String,
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
  lastChecked: {
    type: String,
  },
  status: {
    type: String,
  },
  isFetching: {
    type: Boolean,
  },
  role: {
    type: String,
    enum: ["hospital"],
    required: true,
  },
});

module.exports = mongoose.model("Hospital", HospitalSchema);
