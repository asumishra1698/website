import axios from "axios";
import { toast } from "react-toastify";

export const API_URL = "http://localhost:5000/api/contact";

// ✅ Fetch all contact submissions
export const fetchAllContacts = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    toast.error("Failed to fetch contacts.");
    throw error;
  }
};

// ✅ Create a new contact submission
export const createContact = async (contactData) => {
  try {
    const response = await axios.post(API_URL, contactData, {
      headers: { "Content-Type": "application/json" },
    });
    toast.success("Message sent successfully!");
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || "Failed to send message.";
    console.error("Error creating contact:", error);
    toast.error(errorMessage);
    throw error;
  }
};

// ✅ Delete a contact submission by ID
export const deleteContact = async (id) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success("Contact deleted successfully!");
  } catch (error) {
    console.error("Error deleting contact:", error);
    toast.error("Failed to delete contact.");
    throw error;
  }
};