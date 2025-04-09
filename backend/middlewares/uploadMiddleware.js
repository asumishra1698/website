const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure the uploads directories exist
const productUploadDir = path.join(__dirname, "../uploads/products/");
const profileImageUploadDir = path.join(
  __dirname,
  "../uploads/profile-images/"
);

if (!fs.existsSync(productUploadDir)) {
  fs.mkdirSync(productUploadDir, { recursive: true });
}

if (!fs.existsSync(profileImageUploadDir)) {
  fs.mkdirSync(profileImageUploadDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Check if the upload is for a profile image or a product
    if (req.baseUrl.includes("testimonials")) {
      cb(null, profileImageUploadDir); // Save profile images in the profile-images directory
    } else {
      cb(null, productUploadDir); // Save product images in the products directory
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// File Filter - Only allow images
const fileFilter = (req, file, cb) => {
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only images (JPG, JPEG, PNG, WEBP) are allowed"), false);
  }
};

// Multer Configuration
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

module.exports = upload;
