import React, { useState, useEffect, useCallback } from "react";
import {
  createBlogCategory,
  fetchBlogCategoryById,
  updateBlogCategory,
} from "../../../services/BlogCategoryService";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../../../reuseable/Sidebar";

const AddEditBlogCategory = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // Redirect to login if the user is not authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Load category details if editing
  const loadCategory = useCallback(async () => {
    if (!id) return;
    try {
      const category = await fetchBlogCategoryById(id);
      if (category) setName(category.name);
    } catch (error) {
      toast.error("Failed to load blog category.");
    }
  }, [id]);

  useEffect(() => {
    loadCategory();
  }, [loadCategory]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        await updateBlogCategory(id, { name });
        toast.success("Blog category updated successfully!");
      } else {
        await createBlogCategory({ name });
        toast.success("Blog category created successfully!");
      }
      navigate("/admin/manage-blog-categories");
    } catch (error) {
      toast.error("Failed to save blog category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <h2>{id ? "Edit" : "Add"} Blog Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="categoryName">Name:</label>
            <input
              id="categoryName"
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-success"
              disabled={loading}
            >
              {loading ? "Saving..." : id ? "Update" : "Create"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/admin/manage-blog-categories")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditBlogCategory;
