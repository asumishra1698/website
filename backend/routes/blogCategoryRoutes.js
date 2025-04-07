const express = require("express");
const router = express.Router();
const {
  getAllBlogCategories,
  getBlogCategoryById,
  getBlogCategoryBySlug,
  createBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
} = require("../controllers/blogCategoryController");

// Routes for Blog Categories
router.get("/", getAllBlogCategories);
router.get("/:id", getBlogCategoryById);
router.get("/slug/:slug", getBlogCategoryBySlug);
router.post("/", createBlogCategory);
router.put("/:id", updateBlogCategory);
router.delete("/:id", deleteBlogCategory);

module.exports = router;
