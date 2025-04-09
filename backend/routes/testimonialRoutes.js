const express = require("express");
const {
  getAllTestimonials,
  addTestimonial,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonialController");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

// Routes
router.get("/", getAllTestimonials);
router.get("/:id", getTestimonialById);
router.post("/", upload.single("profileImage"), addTestimonial);
router.put("/:id", upload.single("profileImage"), updateTestimonial);
router.delete("/:id", deleteTestimonial);

module.exports = router;