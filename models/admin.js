const mongoose = require("mongoose");

//Admin Schema
const AdminSchema = mongoose.Schema({
  fullName: {
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
  role: {
    type: String,
    enum: ["admin"],
    required: true,
  },
});

module.exports = mongoose.model("Admin", AdminSchema);
