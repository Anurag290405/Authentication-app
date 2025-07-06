const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600 // expires after 10 minutes
  }
});

module.exports = mongoose.model("Otp", otpSchema);
