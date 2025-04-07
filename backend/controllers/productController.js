const Product = require("../models/Product");
const fs = require("fs");
const path = require("path");

// 📌 CREATE PRODUCT
const addProduct = async (req, res) => {
  try {
    const {
      productName,
      shortDescription,
      longDescription,
      regularPrice,
      salePrice,
      stockQuantity,
      productCategory,
      productSubCategory,
      discount,
      isActive,
      metaTitle,
      metaDescription,
    } = req.body;

    // Validate required fields
    if (!productName || !regularPrice || !productCategory) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Handle product image
    const productImage = req.files?.productImage
      ? path.normalize(req.files.productImage[0].path).replace(/\\/g, "/")
      : null;

    // Handle gallery images
    const galleryImages = req.files?.galleryImages
      ? req.files.galleryImages.map((file) =>
          path.normalize(file.path).replace(/\\/g, "/")
        )
      : [];

    // Create a new product
    const newProduct = new Product({
      productName,
      shortDescription,
      longDescription,
      regularPrice,
      salePrice,
      stockQuantity,
      productCategory,
      productSubCategory,
      discount,
      isActive,
      productImage,
      galleryImages,
      metaTitle,
      metaDescription,
    });

    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res
      .status(500)
      .json({ message: "Error adding product", error: error.message });
  }
};

// 📌 GET ALL PRODUCTS
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate(
      "productCategory productSubCategory"
    );
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: error.message });
  }
};

// 📌 GET PRODUCT BY ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "productCategory productSubCategory"
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch product", error: error.message });
  }
};

// 📌 UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const updatedData = req.body;

    // Handle product image update
    if (req.files?.productImage) {
      // Delete old product image
      if (product.productImage) {
        fs.unlink(path.resolve(product.productImage), (err) => {
          if (err) console.error("Error deleting old product image:", err);
        });
      }
      updatedData.productImage = path
        .normalize(req.files.productImage[0].path)
        .replace(/\\/g, "/");
    }

    // Handle gallery images update
    if (req.files?.galleryImages) {
      // Delete old gallery images
      if (product.galleryImages && product.galleryImages.length > 0) {
        product.galleryImages.forEach((imagePath) => {
          fs.unlink(path.resolve(imagePath), (err) => {
            if (err) console.error("Error deleting gallery image:", err);
          });
        });
      }
      updatedData.galleryImages = req.files.galleryImages.map((file) =>
        path.normalize(file.path).replace(/\\/g, "/")
      );
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res
      .status(500)
      .json({ message: "Failed to update product", error: error.message });
  }
};

// 📌 DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete product image if exists
    if (product.productImage) {
      fs.unlink(path.resolve(product.productImage), (err) => {
        if (err) console.error("Error deleting product image:", err);
      });
    }

    // Delete gallery images if exist
    if (product.galleryImages && product.galleryImages.length > 0) {
      product.galleryImages.forEach((imagePath) => {
        fs.unlink(path.resolve(imagePath), (err) => {
          if (err) console.error("Error deleting gallery image:", err);
        });
      });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res
      .status(500)
      .json({ message: "Failed to delete product", error: error.message });
  }
};

// 📌 TOGGLE PRODUCT STATUS
const deactivateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Status updated successfully!", updatedProduct });
  } catch (error) {
    console.error("Error updating product status:", error);
    res
      .status(500)
      .json({ message: "Failed to update status", error: error.message });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  deactivateProduct,
};
