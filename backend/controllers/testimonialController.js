const Testimonial = require("../models/Testimonial");

// Get all testimonials
exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    const updatedTestimonials = testimonials.map((testimonial) => ({
      ...testimonial._doc,
      profileImage: testimonial.profileImage
        ? `${req.protocol}://${req.get(
            "host"
          )}/${testimonial.profileImage.replace(/\\/g, "/")}`
        : null,
    }));

    res.status(200).json(updatedTestimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    res.status(500).json({ error: "Failed to fetch testimonials" });
  }
};

// Get a single testimonial by ID
exports.getTestimonialById = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return res.status(404).json({ error: "Testimonial not found" });
    }

    testimonial.profileImage = testimonial.profileImage
      ? `${req.protocol}://${req.get(
          "host"
        )}/${testimonial.profileImage.replace(/\\/g, "/")}`
      : null;

    res.status(200).json(testimonial);
  } catch (error) {
    console.error("Error fetching testimonial by ID:", error);
    res.status(500).json({ error: "Failed to fetch testimonial" });
  }
};

// Add a new testimonial
exports.addTestimonial = async (req, res) => {
  try {
    const { name, designation, comment, rating } = req.body;
    const profileImage = req.file
      ? `uploads/profile-images/${req.file.filename}`.replace(/\\/g, "/")
      : null;

    if (!name || !designation || !comment || !rating) {
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
    const { name, designation, comment, rating } = req.body;

    const profileImage = req.file
      ? `uploads/profile-images/${req.file.filename}`.replace(/\\/g, "/")
      : undefined;

    const updatedData = {
      name,
      designation,
      comment,
      rating,
    };

    if (profileImage) {
      updatedData.profileImage = profileImage;
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    if (!updatedTestimonial) {
      return res.status(404).json({ error: "Testimonial not found" });
    }

    updatedTestimonial.profileImage = updatedTestimonial.profileImage
      ? `${req.protocol}://${req.get(
          "host"
        )}/${updatedTestimonial.profileImage.replace(/\\/g, "/")}`
      : null;

    res.status(200).json(updatedTestimonial);
  } catch (error) {
    console.error("Error updating testimonial:", error);
    res.status(500).json({ error: "Failed to update testimonial" });
  }
};

// Delete a testimonial
exports.deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

    if (!deletedTestimonial) {
      return res.status(404).json({ error: "Testimonial not found" });
    }

    res.status(200).json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    res.status(500).json({ error: "Failed to delete testimonial" });
  }
};
