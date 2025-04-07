const ProductSubCategory = require("../models/ProductSubCategory");

// ✅ Create a new subcategory
exports.addSubCategory = async (req, res) => {
  try {
    const { name, category, description } = req.body;

    const subCategoryExists = await ProductSubCategory.findOne({ name, category });
    if (subCategoryExists) return res.status(400).json({ message: "Subcategory already exists" });

    const subcategory = new ProductSubCategory({ name, category, description });
    await subcategory.save();

    res.status(201).json(subcategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all subcategories
exports.getSubCategories = async (req, res) => {
  try {
    const subcategories = await ProductSubCategory.find().populate("category", "name");
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get subcategory by ID
exports.getSubCategoryById = async (req, res) => {
  try {
    const subcategory = await ProductSubCategory.findById(req.params.id).populate("category", "name");
    if (!subcategory) return res.status(404).json({ message: "Subcategory not found" });

    res.status(200).json(subcategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update subcategory
exports.updateSubCategory = async (req, res) => {
  try {
    const { name, category, description } = req.body;
    const subcategory = await ProductSubCategory.findByIdAndUpdate(
      req.params.id,
      { name, category, description },
      { new: true }
    );

    if (!subcategory) return res.status(404).json({ message: "Subcategory not found" });

    res.status(200).json(subcategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete subcategory
exports.deleteSubCategory = async (req, res) => {
  try {
    const subcategory = await ProductSubCategory.findByIdAndDelete(req.params.id);
    if (!subcategory) return res.status(404).json({ message: "Subcategory not found" });

    res.status(200).json({ message: "Subcategory deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSubCategoriesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res.status(400).json({ error: "Category ID is required" });
    }

    const subCategories = await ProductSubCategory.find({ category: categoryId });

    res.json(subCategories);
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};