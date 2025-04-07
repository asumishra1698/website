const Blog = require("../models/Blog");
const BlogCategory = require("../models/BlogCategory");
const path = require("path");
const fs = require("fs");

// 📌 CREATE BLOG
exports.createBlog = async (req, res) => {
  try {
    const { title, content, author, slug, category } = req.body;

    // Validate category exists
    const categoryExists = await BlogCategory.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: "Invalid blog category" });
    }

    // Check for duplicate slug
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return res.status(400).json({ message: "Slug already exists" });
    }

    // Handle Image Upload
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    // Create and Save Blog
    const newBlog = new Blog({ title, content, author, slug, image, category });
    await newBlog.save();

    res
      .status(201)
      .json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 📌 UPDATE BLOG BY ID
exports.updateBlogById = async (req, res) => {
  try {
    const { title, content, author, slug, category } = req.body;

    let updateData = { title, content, author, slug, category };

    // Handle Image Update
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    console.error("Error updating blog by ID:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// 📌 UPDATE BLOG BY SLUG
exports.updateBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const { title, content, author, publishedAt, category } = req.body;

    const updateData = { title, content, author, publishedAt, category };

    // Handle Image Update
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedBlog = await Blog.findOneAndUpdate({ slug }, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res
      .status(200)
      .json({ message: "Blog updated successfully!", blog: updatedBlog });
  } catch (error) {
    console.error("Error updating blog by slug:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// 📌 DELETE BLOG BY ID
exports.deleteBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Delete blog image if exists
    if (blog.image) {
      fs.unlink(path.resolve(blog.image), (err) => {
        if (err) console.error("Error deleting blog image:", err);
      });
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog by ID:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// 📌 DELETE BLOG BY SLUG
exports.deleteBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({ slug: req.params.slug });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Delete blog image if exists
    if (blog.image) {
      fs.unlink(path.resolve(blog.image), (err) => {
        if (err) console.error("Error deleting blog image:", err);
      });
    }

    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog by slug:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// 📌 GET ALL BLOGS
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("category", "name");
    res.json(blogs);
  } catch (error) {
    console.error("Error fetching all blogs:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// 📌 GET BLOG BY ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "category",
      "name"
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog);
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// 📌 GET BLOG BY SLUG
exports.getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug }).populate("category", "name");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog);
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.getRelatedBlogs = async (req, res) => {
  try {
    const { category, exclude } = req.query;

    // Validate category parameter
    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    // Fetch related blogs
    const relatedBlogs = await Blog.find({
      category,
      slug: { $ne: exclude }, // Exclude the current blog
    }).limit(5); // Limit the number of related blogs

    res.status(200).json(relatedBlogs);
  } catch (error) {
    console.error("Error fetching related blogs:", error);
    res.status(500).json({ message: "Failed to fetch related blogs" });
  }
};
