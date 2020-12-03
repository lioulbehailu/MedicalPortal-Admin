const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const DoctorSchema = mongoose.Schema({
  doctorName: {
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
  hospitalInfo: {
    type: ObjectId,
    ref: "Hospital",
    required: true,
  },
  role: {
    type: String,
    enum: ["hospital"],
    required: true,
  },
});

module.exports = mongoose.model("Doctor", DoctorSchema);
