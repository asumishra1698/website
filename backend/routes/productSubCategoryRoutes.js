const express = require("express");
const {
  addSubCategory,
  getSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
  getSubCategoriesByCategory,
} = require("../controllers/productSubCategoryController");

const router = express.Router();

router.post("/", addSubCategory);
router.get("/", getSubCategories);
router.get("/:id", getSubCategoryById);
router.put("/:id", updateSubCategory);
router.delete("/:id", deleteSubCategory);
router.get("/by-category/:categoryId", getSubCategoriesByCategory);

module.exports = router;
