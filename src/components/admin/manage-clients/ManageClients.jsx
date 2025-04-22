import React, { useEffect, useState } from "react";
import { getAllClients, deleteClient } from "../../../services/ClientService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../reuseable/Sidebar";
import { BASE_URL } from "../../../config";

const ManageClients = () => {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadClients = async () => {
      const data = await getAllClients();
      setClients(data);
    };
    loadClients();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      await deleteClient(id);
      setClients(clients.filter((c) => c._id !== id));
      toast.success("Client deleted");
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content p-6 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold mb-4">Manage Clients</h2>
          <button
            onClick={() => navigate("/admin/add-client")}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            + Add New Client
          </button>
        </div>
        <table className="w-full bg-white border rounded shadow">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3">Image</th>
              <th className="p-3">Client Name</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client._id} className="border-t">
                <td className="p-3">
                  <img
                    src={`${BASE_URL}/uploads/clients/${client.clientImage}`}
                    alt={client.clientName}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-3">{client.clientName}</td>
                <td className="p-3">
                  <button
                    onClick={() => navigate(`/admin/edit-client/${client._id}`)}
                    className="text-blue-600 hover:underline mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(client._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default ManageClients;
