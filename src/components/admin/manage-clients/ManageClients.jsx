import React, { useEffect, useState } from "react";
import { getAllClients, deleteClient } from "../../../services/ClientService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../reuseable/Sidebar";
import { BASE_URL } from "../../../config";

const ManageClients = () => {
  const [allClients, setAllClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
  }, [navigate]);

  useEffect(() => {
    const loadClients = async () => {
      try {
        const data = await getAllClients();
        setAllClients(data || []);
      } catch (error) {
        toast.error("Failed to load clients");
      }
    };
    loadClients();
  }, []);

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = allClients.slice(
    indexOfFirstClient,
    indexOfLastClient
  );
  const totalPages = Math.ceil(allClients.length / clientsPerPage);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        await deleteClient(id);
        toast.success("Client deleted");
        setAllClients(allClients.filter((c) => c._id !== id));
      } catch (error) {
        toast.error("Failed to delete client");
      }
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content p-6 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Manage Clients</h2>
          <button
            onClick={() => navigate("/admin/add-client")}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700"
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
            {currentClients.length > 0 ? (
              currentClients.map((client) => (
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
                      onClick={() =>
                        navigate(`/admin/edit-client/${client._id}`)
                      }
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
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-3 text-center text-gray-500">
                  No clients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="mt-6 flex justify-end items-center space-x-2">
          {/* Prev Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>

          {/* Page Numbers */}
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default ManageClients;
