const Testimonial = require("../models/Testimonial");

// Get all testimonials
exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch testimonials" });
  }
};

// Add a new testimonial
exports.addTestimonial = async (req, res) => {
  try {
    const { name, designation, comment, rating } = req.body;
    const profileImage = req.file ? req.file.path : null;

    if (!name || !designation || !comment || !rating || !profileImage) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newTestimonial = new Testimonial({
      name,
      designation,
      comment,
      rating,
      profileImage,
    });

    await newTestimonial.save();
    res.status(201).json(newTestimonial);
  } catch (error) {
    console.error("Error adding testimonial:", error);
    res.status(500).json({ error: "Failed to add testimonial." });
  }
};

// Update a testimonial
exports.updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedTestimonial);
  } catch (error) {
    res.status(500).json({ error: "Failed to update testimonial" });
  }
};

// Delete a testimonial
exports.deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    await Testimonial.findByIdAndDelete(id);
    res.status(200).json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete testimonial" });
  }
};
