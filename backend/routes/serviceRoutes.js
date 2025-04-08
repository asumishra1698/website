const express = require("express");
const multer = require("multer");
const {
  addService,
  getAllServices,
  getServiceBySlug,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Routes
router.post("/", upload.single("image"), addService);
router.get("/", getAllServices);
router.get("/:slug", getServiceBySlug);
router.put("/:slug", upload.single("image"), updateService);
router.delete("/:slug", deleteService);

module.exports = router;