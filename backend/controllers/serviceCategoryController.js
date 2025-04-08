const ServiceCategory = require("../models/serviceCategoryModel");

// 📌 Add a New Service Category
exports.addServiceCategory = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if the category already exists
    const existingCategory = await ServiceCategory.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const newCategory = new ServiceCategory({ name });
    await newCategory.save();

    res.status(201).json({ message: "Category added successfully", category: newCategory });
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// 📌 Get All Service Categories
exports.getAllServiceCategories = async (req, res) => {
  try {
    const categories = await ServiceCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// 📌 Delete a Service Category
exports.deleteServiceCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await ServiceCategory.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};