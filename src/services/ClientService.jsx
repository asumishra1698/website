import axios from "axios";

const API_URL = "http://localhost:5000/api/clients";

// Create a new client
export const createClient = async (formData) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Get all clients
export const getAllClients = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Get a client by ID
export const getClientById = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Update a client
export const updateClient = async (id, clientData) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(`${API_URL}/${id}`, clientData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Delete a client
export const deleteClient = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};