import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getClientById, updateClient } from "../../../services/ClientService";
import Sidebar from "../../../reuseable/Sidebar";
import { BASE_URL } from "../../../config";

const EditClient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    clientName: "",
  });
  const [clientImage, setClientImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
      if (!localStorage.getItem("token")) {
        navigate("/login");
        return;
      }
    }, [navigate]);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const client = await getClientById(id);
        setFormData({ clientName: client.clientName });
        setPreviewImage(
          `${BASE_URL}/uploads/clients/${client.clientImage}`
        );
      } catch (error) {
        console.error("Error fetching client:", error);
        toast.error("Failed to load client.");
      }
    };
    fetchClient();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setClientImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = new FormData();
    dataToSend.append("clientName", formData.clientName);
    if (clientImage) {
      dataToSend.append("clientImage", clientImage);
    }

    try {
      await updateClient(id, dataToSend);
      toast.success("Client updated successfully!");
      navigate("/admin/manage-clients");
    } catch (error) {
      console.error("Error updating client:", error);
      toast.error("Failed to update client.");
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content p-6 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Edit Client</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            placeholder="Client Name"
            required
            className="w-full p-2 border rounded mb-4"
          />

          {previewImage && (
            <div className="mb-4">
              <img
                src={previewImage}
                alt="Client Preview"
                className="w-32 h-32 object-cover rounded"
              />
            </div>
          )}

          <input
            type="file"
            onChange={handleImageChange}
            className="w-full p-2 border rounded mb-4"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update Client
          </button>
        </form>
      </main>
    </div>
  );
};

export default EditClient;
