import axios from "axios";

const API_URL = "http://localhost:5000/api/clients";

// Create a new client
export const createClient = async (formData) => {
    const response = await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  };
  
// Get all clients
export const getAllClients = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get a client by ID
export const getClientById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Update a client
export const updateClient = async (id, clientData) => {
  const response = await axios.put(`${API_URL}/${id}`, clientData);
  return response.data;
};

// Delete a client
export const deleteClient = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
