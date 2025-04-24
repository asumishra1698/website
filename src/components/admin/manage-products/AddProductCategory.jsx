import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  addCategory,
  fetchCategories,
  updateCategory,
  deleteCategory,
} from "../../../services/CategoryService";
import Swal from "sweetalert2";
import Sidebar from "../../../reuseable/Sidebar";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

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
      Swal.fire("Error!", "Failed to load categories!", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (categoryId) {
        await updateCategory(categoryId, { name, description });
        Swal.fire("Success!", "Category updated successfully!", "success");
      } else {
        await addCategory({ name, description });
        Swal.fire("Success!", "Category added successfully!", "success");
      }
      resetForm();
      loadCategories();
    } catch (error) {
      console.error("Error processing request:", error);
      Swal.fire("Error!", "Failed to process request!", "error");
    }
  };

  const handleEdit = (category) => {
    setCategoryId(category._id);
    setName(category.name);
    setDescription(category.description);
  };

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
      await deleteCategory(id);
      Swal.fire("Deleted!", "Category has been deleted.", "success");
      loadCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      Swal.fire("Error!", "Failed to delete category!", "error");
    }
  };

  const resetForm = () => {
    setCategoryId(null);
    setName("");
    setDescription("");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">
            {categoryId ? "Edit" : "Add"} Product Category
          </h2>
          <button
            onClick={() => navigate("/admin/add-subcategory")}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md"
          >
            Add Subcategory
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md space-y-4"
        >
          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border p-3 w-full rounded-lg shadow-sm"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-3 w-full rounded-lg shadow-sm"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md"
          >
            {categoryId ? "Update" : "Add"} Category
          </button>
          {categoryId && (
            <button
              type="button"
              className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow-md"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </form>

        <h3 className="mt-6 text-xl font-semibold">Existing Categories</h3>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.length > 0 ? (
            categories.map((cat) => (
              <div key={cat._id} className="p-4 bg-white rounded-lg shadow-md">
                <p className="font-semibold">{cat.name}</p>
                <p className="text-sm text-gray-500">{cat.description}</p>
                <div className="mt-2">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg shadow-sm mr-2"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow-sm"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No categories added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageCategories;
