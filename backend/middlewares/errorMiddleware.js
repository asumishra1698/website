const multer = require("multer");
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);

  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: `Multer Error: ${err.message}` });
  } else if (err.message.includes("Only images")) {
    return res.status(400).json({ message: err.message });
  }

  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
};

module.exports = errorHandler;
