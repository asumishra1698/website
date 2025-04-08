const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    h1Title: {
      type: String,
      required: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },
    h2Title: {
      type: String,
      required: true,
      trim: true,
    },
    paragraph1: {
      type: String,
      required: true,
    },
    paragraph2: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    image: {
      type: String,
      required: true,
    },
    serviceCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceCategory",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
