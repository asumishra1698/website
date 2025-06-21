import axios from "axios";

const API_URL = "http://localhost:5000/api/subcategories";

// ✅ Fetch all subcategories
export const fetchSubCategories = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    throw error;
  }
};

// ✅ Add a new subcategory
export const addSubCategory = async (subCategoryData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(API_URL, subCategoryData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding subcategory:", error);
    throw error;
  }
};

// ✅ Delete a subcategory
export const deleteSubCategory = async (id) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Error deleting subcategory:", error);
    throw error;
  }
};

export const fetchSubCategoriesByCategory = async (categoryId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${API_URL}/by-category/${categoryId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    throw error;
  }
};

export const updateSubCategory = async (id, updatedData) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(`${API_URL}/${id}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};