const express = require("express");

const {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  deactivateProduct,
} = require("../controllers/productController");

const upload = require("../middlewares/uploadMiddleware");
const errorHandler = require("../middlewares/errorMiddleware");

const router = express.Router();

// 📌 CREATE PRODUCT
router.post(
  "/",
  upload.fields([
    { name: "productImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 5 },
  ]),
  addProduct
);

// 📌 GET ALL PRODUCTS
router.get("/", getAllProducts);

// 📌 GET PRODUCT BY ID
router.get("/:id", getProductById);

// 📌 UPDATE PRODUCT
router.put(
  "/update/:id",
  upload.fields([
    { name: "productImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 5 },
  ]),
  updateProduct
);

// 📌 DELETE PRODUCT
router.delete("/delete/:id", deleteProduct);

router.put("/toggle-status/:id", deactivateProduct);

// 📌 Apply error handling middleware
router.use(errorHandler);

module.exports = router;
