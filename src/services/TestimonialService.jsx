import axios from "axios";
import { toast } from "react-toastify";

export const API_URL = "http://localhost:5000/api/testimonials";

// ✅ Fetch all testimonials
export const fetchAllTestimonials = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching all testimonials:", error);
    toast.error("Failed to fetch testimonials.");
    throw error;
  }
};

// ✅ Fetch a single testimonial by ID
export const fetchTestimonialById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching testimonial by ID (${id}):`, error);
    toast.error("Failed to fetch testimonial.");
    throw error;
  }
};

// ✅ Create a new testimonial
export const createTestimonial = async (testimonialData) => {
  try {
    const response = await axios.post(API_URL, testimonialData); // No need to set headers for FormData
    toast.success("Testimonial created successfully!");
    return response.data;
  } catch (error) {
    console.error("Error creating testimonial:", error);
    toast.error("Failed to create testimonial.");
    throw error;
  }
};

// ✅ Update an existing testimonial by ID
export const updateTestimonial = async (id, testimonialData) => {
  try {
    await axios.put(`${API_URL}/${id}`, testimonialData);
    toast.success("Testimonial updated successfully!");
  } catch (error) {
    console.error(`Error updating testimonial by ID (${id}):`, error);
    const errorMessage =
      error.response?.data?.error || "Failed to update testimonial.";
    toast.error(errorMessage);
    throw error;
  }
};

// ✅ Delete a testimonial by ID
export const deleteTestimonial = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    toast.success("Testimonial deleted successfully!");
  } catch (error) {
    console.error(`Error deleting testimonial by ID (${id}):`, error);
    toast.error("Failed to delete testimonial.");
    throw error;
  }
};
