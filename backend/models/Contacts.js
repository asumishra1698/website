const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    countryCode: { type: String, required: true },
    phone: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return v.toString().length <= 14; // Ensure phone number is at most 14 digits
        },
        message: "Phone number must not exceed 14 digits.",
      },
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          // Regex for validating email
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Please enter a valid email address.",
      },
    },
    message: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          // Ensure the message has at most 30 words
          return v.split(" ").length <= 30;
        },
        message: "Message must not exceed 30 words.",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);