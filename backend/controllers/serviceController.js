const Service = require("../models/ServiceModel");

// 📌 Add a New Service
exports.addService = async (req, res) => {
  try {
    const {
      h1Title,
      shortDescription,
      h2Title,
      paragraph1,
      paragraph2,
      slug,
      serviceCategory,
    } = req.body;
    const image = req.file ? `uploads/${req.file.filename}` : "";

    // Check for duplicate slug
    const existingService = await Service.findOne({ slug });
    if (existingService) {
      return res.status(400).json({ message: "Slug already exists" });
    }

    const newService = new Service({
      h1Title,
      shortDescription,
      h2Title,
      paragraph1,
      paragraph2,
      slug,
      image,
      serviceCategory,
    });

    await newService.save();
    res
      .status(201)
      .json({ message: "Service added successfully", service: newService });
  } catch (error) {
    console.error("Error adding service:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// 📌 Get All Services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find().populate("serviceCategory", "name");
    res.status(200).json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// 📌 Get a Single Service by Slug
exports.getServiceBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const service = await Service.findOne({ slug }).populate(
      "serviceCategory",
      "name"
    );

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json(service);
  } catch (error) {
    console.error("Error fetching service by slug:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// 📌 Update a Service
exports.updateService = async (req, res) => {
  try {
    const { slug } = req.params;
    const {
      h1Title,
      shortDescription,
      h2Title,
      paragraph1,
      paragraph2,
      serviceCategory,
    } = req.body;
    const image = req.file ? `uploads/${req.file.filename}` : undefined;

    const updatedData = {
      h1Title,
      shortDescription,
      h2Title,
      paragraph1,
      paragraph2,
      serviceCategory,
    };

    if (image) updatedData.image = image;

    const updatedService = await Service.findOneAndUpdate(
      { slug },
      updatedData,
      { new: true }
    );

    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({
      message: "Service updated successfully",
      service: updatedService,
    });
  } catch (error) {
    console.error("Error updating service:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// 📌 Delete a Service
exports.deleteService = async (req, res) => {
  try {
    const { slug } = req.params;

    const deletedService = await Service.findOneAndDelete({ slug });

    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error deleting service:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
