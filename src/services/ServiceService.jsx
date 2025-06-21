import axios from "axios";
import { toast } from "react-toastify";

export const API_URL = "http://localhost:5000/api/services";

// ✅ Fetch all services
export const fetchAllServices = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all services:", error);
    toast.error("Failed to fetch services.");
    throw error;
  }
};

// ✅ Fetch a single service by slug
export const fetchServiceBySlug = async (slug) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/${slug}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching service by slug (${slug}):`, error);
    toast.error("Failed to fetch service.");
    throw error;
  }
};

// ✅ Create a new service
export const createService = async (serviceData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(API_URL, serviceData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Service created successfully!");
    return response.data;
  } catch (error) {
    console.error("Error creating service:", error);
    toast.error("Failed to create service.");
    throw error;
  }
};

// ✅ Update an existing service by slug
export const updateService = async (slug, serviceData) => {
  try {
    const token = localStorage.getItem("token");
    await axios.put(`${API_URL}/${slug}`, serviceData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Service updated successfully!");
  } catch (error) {
    console.error(`Error updating service by slug (${slug}):`, error);
    toast.error("Failed to update service.");
    throw error;
  }
};

// ✅ Delete a service by slug
export const deleteService = async (slug) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`${API_URL}/${slug}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success("Service deleted successfully!");
  } catch (error) {
    console.error(`Error deleting service by slug (${slug}):`, error);
    toast.error("Failed to delete service.");
    throw error;
  }
};