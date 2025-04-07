import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createProduct } from "../../../services/ProductService";
import { fetchCategories } from "../../../services/CategoryService";
import { fetchSubCategoriesByCategory } from "../../../services/SubCategoryService";
import Sidebar from "../../../reuseable/Sidebar";

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: "",
    shortDescription: "",
    longDescription: "",
    regularPrice: "",
    salePrice: "",
    stockQuantity: "",
    productCategory: "",
    productSubCategory: "",
    discount: "",
    isActive: true,
    metaTitle: "",
    metaDescription: "",
  });

  const [productImage, setProductImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  // Load categories on component mount
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories.");
    }
  };

  const handleCategoryChange = async (e) => {
    const selectedCategory = e.target.value;
    setFormData({
      ...formData,
      productCategory: selectedCategory,
      productSubCategory: "",
    });

    if (!selectedCategory) {
      setSubCategories([]);
      return;
    }

    try {
      const data = await fetchSubCategoriesByCategory(selectedCategory);
      if (Array.isArray(data)) {
        setSubCategories(data);
      } else {
        setSubCategories([]);
        console.error("Invalid subcategories response:", data);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      toast.error("Failed to load subcategories.");
      setSubCategories([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "isActive" ? value === "true" : value,
    }));
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  const handleGalleryChange = (e) => {
    setGalleryImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    if (productImage) formDataToSend.append("productImage", productImage);
    galleryImages.forEach((file) => {
      formDataToSend.append("galleryImages", file);
    });

    try {
      await createProduct(formDataToSend);
      toast.success("Product added successfully!");
      navigate("/admin/manage-product");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product.");
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content p-6 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Add Product</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            placeholder="Product Name"
            required
            className="w-full p-2 border rounded mb-2"
          />

          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            placeholder="Short Description"
            required
            className="w-full p-2 border rounded mb-2"
          />

          <textarea
            name="longDescription"
            value={formData.longDescription}
            onChange={handleChange}
            placeholder="Long Description"
            className="w-full p-2 border rounded mb-2"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="regularPrice"
              value={formData.regularPrice}
              onChange={handleChange}
              placeholder="Regular Price"
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="number"
              name="salePrice"
              value={formData.salePrice}
              onChange={handleChange}
              placeholder="Sale Price"
              className="w-full p-2 border rounded"
            />
          </div>

          <input
            type="number"
            name="stockQuantity"
            value={formData.stockQuantity}
            onChange={handleChange}
            placeholder="Stock Quantity"
            required
            className="w-full p-2 border rounded mb-2"
          />

          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            placeholder="Discount (%)"
            className="w-full p-2 border rounded mb-2"
          />

          {/* Category Dropdown */}
          <select
            name="productCategory"
            value={formData.productCategory}
            onChange={handleCategoryChange}
            required
            className="w-full p-2 border rounded mb-2"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Subcategory Dropdown */}
          <select
            name="productSubCategory"
            value={formData.productSubCategory}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mb-2"
            disabled={!formData.productCategory}
          >
            <option value="">Select Subcategory</option>
            {subCategories.map((sub) => (
              <option key={sub._id} value={sub._id}>
                {sub.name}
              </option>
            ))}
          </select>

          <input
            type="file"
            onChange={handleImageChange}
            className="w-full p-2 border rounded mb-2"
          />

          <input
            type="file"
            multiple
            onChange={handleGalleryChange}
            className="w-full p-2 border rounded mb-2"
          />

          <select
            name="isActive"
            value={formData.isActive}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          <textarea
            name="metaTitle"
            value={formData.metaTitle}
            onChange={handleChange}
            placeholder="Meta Title"
            required
            className="w-full p-2 border rounded mb-2"
          />

          <textarea
            name="metaDescription"
            value={formData.metaDescription}
            onChange={handleChange}
            placeholder="Meta Description"
            className="w-full p-2 border rounded mb-2"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Product
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddProduct;
