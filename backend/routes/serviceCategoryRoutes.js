const express = require("express");
const {
  addServiceCategory,
  getAllServiceCategories,
  deleteServiceCategory,
} = require("../controllers/serviceCategoryController");

const router = express.Router();

// Routes
router.post("/", addServiceCategory); // Add a new category
router.get("/", getAllServiceCategories); // Get all categories
router.delete("/:id", deleteServiceCategory); // Delete a category by ID

module.exports = router;