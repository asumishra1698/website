import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createClient } from "../../../services/ClientService";
import Sidebar from "../../../reuseable/Sidebar";

const AddClient = () => {
  const navigate = useNavigate();
  const [clientName, setClientName] = useState("");
  const [clientImage, setClientImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!clientName || !clientImage) {
      toast.error("Please enter client name and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("clientName", clientName);
    formData.append("clientImage", clientImage);

    try {
      await createClient(formData);
      toast.success("Client added successfully!");
      navigate("/admin/manage-clients");
    } catch (error) {
      console.error("Error adding client:", error);
      toast.error("Failed to add client.");
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content p-6 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Add Client</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            name="clientName"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Client Name"
            required
            className="w-full p-2 border rounded mb-4"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setClientImage(e.target.files[0])}
            required
            className="w-full p-2 border rounded mb-4"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Client
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddClient;
