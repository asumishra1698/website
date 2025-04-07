const BlogCategory = require("../models/BlogCategory");

// ✅ Create a new blog category
exports.createBlogCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const slug = name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    const existingBlogCategory = await BlogCategory.findOne({ slug });
    if (existingBlogCategory) {
      return res.status(400).json({ message: "Blog category already exists" });
    }

    const newBlogCategory = new BlogCategory({ name, slug });
    await newBlogCategory.save();
    res.status(201).json(newBlogCategory);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update a blog category
exports.updateBlogCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const slug = name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    const updatedBlogCategory = await BlogCategory.findByIdAndUpdate(
      req.params.id,
      { name, slug },
      { new: true }
    );

    if (!updatedBlogCategory)
      return res.status(404).json({ message: "Blog category not found" });
    res.json(updatedBlogCategory);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete a blog category
exports.deleteBlogCategory = async (req, res) => {
  try {
    const deletedBlogCategory = await BlogCategory.findByIdAndDelete(
      req.params.id
    );
    if (!deletedBlogCategory)
      return res.status(404).json({ message: "Blog category not found" });
    res.json({ message: "Blog category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get all blog categories
exports.getAllBlogCategories = async (req, res) => {
  try {
    const blogCategories = await BlogCategory.find();
    res.json(blogCategories);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get blog category by ID
exports.getBlogCategoryById = async (req, res) => {
  try {
    const blogCategory = await BlogCategory.findById(req.params.id);
    if (!blogCategory)
      return res.status(404).json({ message: "Blog category not found" });
    res.json(blogCategory);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get blog category by Slug
exports.getBlogCategoryBySlug = async (req, res) => {
  try {
    const blogCategory = await BlogCategory.findOne({ slug: req.params.slug });
    if (!blogCategory)
      return res.status(404).json({ message: "Blog category not found" });
    res.json(blogCategory);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};