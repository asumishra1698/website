import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchProductById,
  updateProduct,
} from "../../../services/ProductService";
import { fetchCategories } from "../../../services/CategoryService";
import { fetchSubCategoriesByCategory } from "../../../services/SubCategoryService";
import Sidebar from "../../../reuseable/Sidebar";

const EditProduct = () => {
  const { id } = useParams();
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

  const loadProduct = useCallback(async () => {
    try {
      const product = await fetchProductById(id);
      setFormData({
        ...product,
        isActive: product.isActive || true,
      });
      if (product.productCategory) {
        const subData = await fetchSubCategoriesByCategory(
          product.productCategory
        );
        setSubCategories(subData);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  }, [id]);

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Load categories and product details on component mount
  useEffect(() => {
    loadCategories();
    loadProduct();
  }, [loadProduct]);

  const handleCategoryChange = async (e) => {
    const selectedCategory = e.target.value;
    setFormData((prev) => ({
      ...prev,
      productCategory: selectedCategory,
      productSubCategory: "",
    }));
    try {
      const subData = await fetchSubCategoriesByCategory(selectedCategory);
      setSubCategories(subData);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
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

  const handleImageChange = (e) => setProductImage(e.target.files[0] || null);
  const handleGalleryChange = (e) =>
    setGalleryImages(Array.from(e.target.files));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      formDataToSend.append(key, value)
    );
    if (productImage) formDataToSend.append("productImage", productImage);
    galleryImages.forEach((file) =>
      formDataToSend.append("galleryImages", file)
    );
    try {
      await updateProduct(id, formDataToSend);
      navigate("/admin/manage-product");
    } catch (error) {
      console.error(
        "Error updating product:",
        error.response?.data || error.message
      );
      alert("Failed to update product. Check console for details.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="mx-auto bg-white shadow-lg rounded-lg p-6">
          <h2 className="font-bold text-gray-800 mb-6">Edit Product</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              placeholder="Product Name"
              required
              className="w-full p-3 border rounded"
            />
            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              placeholder="Short Description"
              required
              className="w-full p-3 border rounded"
            />
            <textarea
              name="longDescription"
              value={formData.longDescription}
              onChange={handleChange}
              placeholder="Long Description"
              className="w-full p-3 border rounded"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="regularPrice"
                value={formData.regularPrice}
                onChange={handleChange}
                placeholder="Regular Price"
                required
                className="w-full p-3 border rounded"
              />
              <input
                type="number"
                name="salePrice"
                value={formData.salePrice}
                onChange={handleChange}
                placeholder="Sale Price"
                className="w-full p-3 border rounded"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleChange}
                placeholder="Stock Quantity"
                required
                className="w-full p-3 border rounded"
              />
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                placeholder="Discount (%)"
                className="w-full p-3 border rounded"
              />
            </div>
            <select
              name="productCategory"
              value={formData.productCategory}
              onChange={handleCategoryChange}
              required
              className="w-full p-3 border rounded"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <select
              name="productSubCategory"
              value={formData.productSubCategory}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded"
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
              className="w-full p-3 border rounded"
            />
            <input
              type="file"
              multiple
              onChange={handleGalleryChange}
              className="w-full p-3 border rounded"
            />
            <select
              name="isActive"
              value={formData.isActive.toString()}
              onChange={handleChange}
              className="w-full p-3 border rounded"
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
              className="w-full p-3 border rounded"
            />
            <textarea
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleChange}
              placeholder="Meta Description"
              className="w-full p-3 border rounded"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
            >
              Update Product
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditProduct;
