const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: String, required: true, min: 1, max: 5 },
  profileImage: { type: String, required: true },
});

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

module.exports = Testimonial;
