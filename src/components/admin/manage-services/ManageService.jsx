import React, { useEffect, useState } from "react";
import { fetchAllServices, deleteService } from "../../../services/ServiceService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Sidebar from "../../../reuseable/Sidebar";

const ManageService = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Fetch all services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await fetchAllServices();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
        toast.error("Failed to load services.");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Handle delete action
  const handleDelete = async (slug) => {
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
      await deleteService(slug);
      setServices((prevServices) =>
        prevServices.filter((service) => service.slug !== slug)
      );
      toast.success("Service deleted successfully!");
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Failed to delete service.");
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="main-content p-6 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">Manage Services</h2>
          <button
            onClick={() => navigate("/admin/add-service")}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            + Add New Service
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading services...</p>
        ) : services.length === 0 ? (
          <p className="text-gray-500">No services available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service._id}
                className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition"
              >
                <img
                  src={`http://localhost:5000/${service.image}`}
                  alt={service.h1Title}
                  className="h-40 w-full object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-bold text-gray-800">
                  {service.h1Title}
                </h3>
                <p className="text-sm text-gray-600">
                  {service.shortDescription?.substring(0, 100)}...
                </p>
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => navigate(`/edit-service/${service.slug}`)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service.slug)}
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

export default ManageService;