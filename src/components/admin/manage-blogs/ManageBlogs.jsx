import React, { useEffect, useState } from "react";
import { fetchAllBlogs, deleteBlog } from "../../../services/BlogService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "../Dashboard.css";
import Sidebar from "../../../reuseable/Sidebar";

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Fetch all blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await fetchAllBlogs();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        toast.error("Failed to load blogs.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
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
      await deleteBlog(id);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
      toast.success("Blog deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog.");
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="main-content p-6 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">Manage Blogs</h2>
          <button
            onClick={() => navigate("/admin/add-blog")}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            + Add New Blog
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p className="text-gray-500">No blogs available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-lg font-bold text-gray-800">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {blog.content?.substring(0, 100)}...
                </p>
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => navigate(`/admin/edit-blog/${blog.slug}`)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
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

export default ManageBlogs;
