const ProductCategory = require("../models/ProductCategory");

// ✅ Create a new category
exports.addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const categoryExists = await ProductCategory.findOne({ name });
    if (categoryExists) return res.status(400).json({ message: "Category already exists" });

    const category = new ProductCategory({ name, description });
    await category.save();

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await ProductCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await ProductCategory.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update category
exports.updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await ProductCategory.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );

    if (!category) return res.status(404).json({ message: "Category not found" });

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await ProductCategory.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
