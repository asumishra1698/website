const fs = require("fs");
const xlsx = require("xlsx");
const Product = require("../models/Product");

const bulkUploadProducts = async (req, res) => {
  try {
    const filePath = req.file.path;

    // Read the Excel file
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Map Excel data to product fields
    const products = data.map((row) => ({
      productName: row["Product Name"],
      shortDescription: row["Short Description"],
      longDescription: row["Long Description"],
      regularPrice: row["Regular Price"],
      salePrice: row["Sale Price"],
      stockQuantity: row["Stock Quantity"],
      productCategory: row["Product Category"],
      productSubCategory: row["Product Subcategory"],
      discount: row["Discount"],
      isActive: row["Is Active"] === "true",
      metaTitle: row["Meta Title"],
      metaDescription: row["Meta Description"],
      productImage: row["Product Image"], // URL or path to the product image
      galleryImages: row["Gallery Images"] // Comma-separated URLs or paths
        ? row["Gallery Images"].split(",").map((img) => img.trim())
        : [],
    }));

    // Save products to the database
    await Product.insertMany(products);
    fs.unlinkSync(filePath);

    res.status(200).json({ message: "Products uploaded successfully!" });
  } catch (error) {
    console.error("Error uploading products:", error);
    res.status(500).json({ error: "Failed to upload products." });
  }
};

module.exports = { bulkUploadProducts };
