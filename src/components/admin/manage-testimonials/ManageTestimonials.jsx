import React, { useEffect, useState } from "react";
import {
  fetchAllTestimonials,
  deleteTestimonial,
} from "../../../services/TestimonialService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Sidebar from "../../../reuseable/Sidebar";

const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const testimonialsPerPage = 9; 
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Fetch all testimonials
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await fetchAllTestimonials();
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        toast.error("Failed to load testimonials.");
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
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
      await deleteTestimonial(id);
      setTestimonials((prevTestimonials) =>
        prevTestimonials.filter((testimonial) => testimonial._id !== id)
      );
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  // Pagination logic
  const indexOfLastTestimonial = currentPage * testimonialsPerPage;
  const indexOfFirstTestimonial = indexOfLastTestimonial - testimonialsPerPage;
  const currentTestimonials = testimonials.slice(
    indexOfFirstTestimonial,
    indexOfLastTestimonial
  );

  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="main-content p-6 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">
            Manage Testimonials
          </h2>
          <button
            onClick={() => navigate("/admin/add-testimonial")}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            + Add New Testimonial
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading testimonials...</p>
        ) : testimonials.length === 0 ? (
          <p className="text-gray-500">No testimonials available.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentTestimonials.map((testimonial) => (
                <div
                  key={testimonial._id}
                  className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <img
                    src={testimonial.profileImage}
                    alt={testimonial.name}
                    className="h-24 w-24 object-cover mx-auto rounded-full"
                  />
                  <h3 className="text-lg font-bold text-gray-800 text-center">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-600 text-center">
                    {testimonial.designation}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    {testimonial.comment.substring(0, 100)}...
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() =>
                        navigate(`/admin/edit-testimonial/${testimonial._id}`)
                      }
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-end items-center mt-6 space-x-2">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded ${
                  currentPage === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-500"
                } transition`}
              >
                Previous
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === index + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  } hover:bg-blue-500 hover:text-white transition`}
                >
                  {index + 1}
                </button>
              ))}

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded ${
                  currentPage === totalPages
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-500"
                } transition`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default ManageTestimonials;
