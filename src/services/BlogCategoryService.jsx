import axios from "axios";

const API_URL = "http://localhost:5000/api/blog-categories";

// ✅ Fetch all blog categories
export const fetchBlogCategories = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// ✅ Fetch a single blog category by ID
export const fetchBlogCategoryById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const fetchBlogCategoryBySlug = async (slug) => {
  try {
    const response = await axios.get(`${API_URL}/${slug}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching category by slug:', error);
    throw error;
  }
};

// ✅ Create a new blog category
export const createBlogCategory = async (categoryData) => {
  const response = await axios.post(API_URL, categoryData);
  return response.data;
};

// ✅ Update a blog category
export const updateBlogCategory = async (id, categoryData) => {
  const response = await axios.put(`${API_URL}/${id}`, categoryData);
  return response.data;
};

// ✅ Delete a blog category
export const deleteBlogCategory = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
