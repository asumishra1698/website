const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure the uploads directories exist
const productUploadDir = path.join(__dirname, "../uploads/products/");
const profileImageUploadDir = path.join(
  __dirname,
  "../uploads/profile-images/"
);
const clientImageUploadDir = path.join(
  __dirname,
  "../uploads/clients/"
);


if (!fs.existsSync(productUploadDir)) {
  fs.mkdirSync(productUploadDir, { recursive: true });
}

if (!fs.existsSync(profileImageUploadDir)) {
  fs.mkdirSync(profileImageUploadDir, { recursive: true });
}

if (!fs.existsSync(clientImageUploadDir)) {
  fs.mkdirSync(clientImageUploadDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (req.baseUrl.includes("testimonials")) {
      cb(null, profileImageUploadDir);
    } else if (req.baseUrl.includes("clients")) {
      cb(null, clientImageUploadDir);
    } else {
      cb(null, productUploadDir);
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
