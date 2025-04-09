const multer = require("multer");

const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);

  // Handle Multer-specific errors
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: `Multer Error: ${err.message}` });
  }

  // Handle custom errors (e.g., file type validation)
  if (err.message && err.message.includes("Only images")) {
    return res.status(400).json({ message: err.message });
  }

  // Handle validation errors (e.g., Mongoose validation)
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({ message: "Validation Error", errors });
  }

  // Handle MongoDB duplicate key errors
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res
      .status(400)
      .json({ message: `Duplicate value for field: ${field}` });
  }

  // Default to Internal Server Error
  res.status(500).json({
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "production" ? null : err.message,
  });
};

module.exports = errorHandler;
