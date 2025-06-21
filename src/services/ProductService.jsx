import axios from "axios";
import { toast } from "react-toastify";

export const API_URL = "http://localhost:5000/api/products";

// ✅ Fetch all products
export const fetchAllProducts = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// ✅ Fetch a single product by ID
export const fetchProductById = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// ✅ Create a new product
export const createProduct = async (productData) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(API_URL, productData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// ✅ Update an existing product by ID
export const updateProduct = async (id, productData, navigate) => {
  const token = localStorage.getItem("token");
  await axios.put(`${API_URL}/update/${id}`, productData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  toast.success("Product Updated successfully!");
};

// ✅ Delete a product by ID
export const deleteProduct = async (id) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`${API_URL}/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success("Product deleted successfully!"); // ✅ Success toast
  } catch (error) {
    console.error("Error deleting product:", error);
    toast.error("Failed to delete product."); // ✅ Error toast
  }
};