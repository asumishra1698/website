import React, { useEffect, useState } from "react";
import {
  fetchAllContacts,
  deleteContact,
} from "../../../services/ContactService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "../Dashboard.css";
import Sidebar from "../../../reuseable/Sidebar";

const ManageContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Fetch all contacts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await fetchAllContacts();
        setContacts(data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        toast.error("Failed to load contacts.");
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  // Handle delete action
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteContact(id);
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact._id !== id)
      );
      // toast.success("Contact deleted successfully!");
    } catch (error) {
      console.error("Error deleting contact:", error);
      // toast.error("Failed to delete contact.");
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="main-content p-6 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">
            Manage Contacts
          </h2>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading contacts...</p>
        ) : contacts.length === 0 ? (
          <p className="text-gray-500">No contacts available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-lg font-bold text-gray-800">
                  {contact.name}
                </h3>
                <p className="text-sm text-gray-600">Phone: {contact.phone}</p>
                <p className="text-sm text-gray-600">Email: {contact.email}</p>
                <p className="text-sm text-gray-600">
                  Message: {contact.message}
                </p>
                <div className="flex justify-end items-center mt-4">
                  <button
                    onClick={() => handleDelete(contact._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ManageContacts;
