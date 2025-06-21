import axios from "axios";

// Base API URL for blogs
export const API_URL = "http://localhost:5000/api/blogs";

// ✅ Fetch all blogs
export const fetchAllBlogs = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all blogs:", error);
    throw error;
  }
};

// ✅ Fetch a single blog by ID
export const fetchBlogById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching blog by ID (${id}):`, error);
    throw error;
  }
};

// ✅ Fetch a blog by Slug
export const fetchBlogBySlug = async (slug) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/slug/${slug}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching blog by Slug (${slug}):`, error);
    throw error;
  }
};

// ✅ Fetch related blogs
export const fetchRelatedBlogs = async (categoryId, currentSlug) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${API_URL}/related?category=${categoryId}&exclude=${currentSlug}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching related blogs for category (${categoryId}) excluding slug (${currentSlug}):`,
      error
    );
    throw error;
  }
};

// ✅ Create a new blog
export const createBlog = async (blogData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(API_URL, blogData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  }
};

// ✅ Update an existing blog by Slug
export const updateBlog = async (slug, blogData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API_URL}/slug/${slug}`, blogData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating blog by Slug (${slug}):`, error);
    throw error;
  }
};

// ✅ Delete a blog by ID
export const deleteBlog = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting blog by ID (${id}):`, error);
    throw error;
  }
};