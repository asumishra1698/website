import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  addSubCategory,
  fetchSubCategories,
  deleteSubCategory,
  updateSubCategory,
} from "../../../services/SubCategoryService";
import { fetchCategories } from "../../../services/CategoryService";
import Swal from "sweetalert2";
import Sidebar from "../../../reuseable/Sidebar";

const AddSubCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [editingSubCategory, setEditingSubCategory] = useState(null);
  const navigate = useNavigate();

  // Load categories and subcategories on component mount
  useEffect(() => {
    loadCategories();
    loadSubCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      if (Array.isArray(data)) {
        setCategories(data);
      } else {
        console.error("Unexpected data format for categories:", data);
        setCategories([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };

  const loadSubCategories = async () => {
    try {
      const data = await fetchSubCategories();
      if (Array.isArray(data)) {
        setSubCategories(data);
      } else {
        console.error("Unexpected data format for subcategories:", data);
        setSubCategories([]);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      setSubCategories([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category) {
      Swal.fire("Warning!", "Please select a category!", "warning");
      return;
    }

    try {
      if (editingSubCategory) {
        await updateSubCategory(editingSubCategory._id, {
          name,
          category,
          description,
        });
        Swal.fire("Success!", "Subcategory updated successfully!", "success");
      } else {
        await addSubCategory({ name, category, description });
        Swal.fire("Success!", "Subcategory added successfully!", "success");
      }
      resetForm();
      loadSubCategories();
    } catch (error) {
      console.error("Error saving subcategory:", error);
      Swal.fire("Error!", "Failed to save subcategory!", "error");
    }
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
      await deleteSubCategory(id);
      Swal.fire("Deleted!", "Subcategory has been deleted.", "success");
      loadSubCategories();
    } catch (error) {
      console.error("Error deleting subcategory:", error);
      Swal.fire("Error!", "Failed to delete subcategory!", "error");
    }
  };

  const handleEdit = (sub) => {
    setEditingSubCategory(sub);
    setName(sub.name);
    setDescription(sub.description);
    setCategory(sub.category);
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setCategory("");
    setEditingSubCategory(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {editingSubCategory ? "Edit" : "Add"} Product Subcategory
          </h2>
          <button
            onClick={() => navigate("/admin/add-category")}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md"
          >
            Add Category
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md space-y-4"
        >
          <input
            type="text"
            placeholder="Subcategory Name"
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
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="border p-3 w-full rounded-lg shadow-sm"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md"
          >
            {editingSubCategory ? "Update" : "Add"} Subcategory
          </button>
        </form>

        <h3 className="mt-6 text-xl font-semibold">Existing Subcategories</h3>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subCategories.length > 0 ? (
            subCategories.map((sub) => (
              <div key={sub._id} className="p-4 bg-white rounded-lg shadow-md">
                <p className="font-semibold">{sub.name}</p>
                <p className="text-sm text-gray-500">{sub.description}</p>
                <p className="text-sm text-gray-600">
                  Category:{" "}
                  {categories.find((cat) => cat._id === sub.category)?.name ||
                    "Unknown"}
                </p>
                <div className="mt-2">
                  <button
                    onClick={() => handleEdit(sub)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg shadow-sm mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(sub._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No subcategories added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddSubCategory;
