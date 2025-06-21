import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:5000/api/service-categories";

// ✅ Fetch all categories
export const fetchCategories = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    toast.error("Failed to fetch categories.");
    throw error;
  }
};

// ✅ Create a new category
export const createCategory = async (categoryData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(API_URL, categoryData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    toast.error("Failed to create category.");
    throw error;
  }
};

// ✅ Delete a category by ID
export const deleteCategory = async (id) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    toast.error("Failed to delete category.");
    throw error;
  }
};