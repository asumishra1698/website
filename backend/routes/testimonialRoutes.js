const express = require("express");
const {
  getAllTestimonials,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonialController");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

// Routes
router.get("/", getAllTestimonials);
router.post("/", upload.single("profileImage"), addTestimonial);
router.put("/:id", updateTestimonial);
router.delete("/:id", deleteTestimonial);

module.exports = router;