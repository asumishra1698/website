const express = require("express");
const multer = require("multer");
const { bulkUploadProducts } = require("../controllers/bulkUploadProductController");

const router = express.Router();

// Configure multer for file uploads
const upload = multer({ dest: "uploads/products/" });

// Bulk upload route
router.post("/bulk-upload", upload.single("file"), bulkUploadProducts);

module.exports = router;
