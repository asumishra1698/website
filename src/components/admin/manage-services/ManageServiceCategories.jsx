import React, { useState, useEffect } from "react";
import {
  fetchCategories,
  createCategory,
  deleteCategory,
} from "../../../services/ServiceCategoryService";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Sidebar from "../../../reuseable/Sidebar";

const ManageServiceCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  // Load categories on component mount
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories.");
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      toast.error("Category name is required.");
      return;
    }

    try {
      await createCategory({ name: newCategory });
      toast.success("Category added successfully!");
      setNewCategory("");
      setIsModalOpen(false);
      loadCategories();
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to add category.");
    }
  };

  const handleDeleteCategory = async (id) => {
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
      await deleteCategory(id);
      toast.success("Category deleted successfully!");
      loadCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category.");
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content p-6 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Manage Service Categories
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            + Add Service Category
          </button>
        </div>

        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Category Name</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id} className="border-b">
                <td className="p-3">{category.name}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleDeleteCategory(category._id)}
                    className="text-red-600 px-3 py-1 rounded"
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      {/* Add Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Add New Category</h3>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Category Name"
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageServiceCategories;
