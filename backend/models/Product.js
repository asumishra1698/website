const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    shortDescription: { type: String, required: true },
    longDescription: { type: String },
    regularPrice: { type: Number, required: true },
    salePrice: { type: Number },
    stockQuantity: { type: Number, required: true },
    productImage: { type: String, required: true },
    galleryImages: [{ type: String }],
    productCategory: { type: String, required: true },
    productSubCategory: { type: String },
    isActive: { type: Boolean, default: true },
    discount: { type: Number, default: 0 },
    metaDescription: { type: String },
    metaTitle: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
