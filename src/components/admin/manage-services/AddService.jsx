import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";
import { createService } from "../../../services/ServiceService";
import { fetchCategories } from "../../../services/ServiceCategoryService"; // Ensure this points to the correct service category API
import Sidebar from "../../../reuseable/Sidebar";

const AddService = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    h1Title: "",
    shortDescription: "",
    h2Title: "",
    paragraph1: "",
    paragraph2: "",
    slug: "",
    serviceCategory: "",
  });

  const [serviceImage, setServiceImage] = useState(null);
  const [categories, setCategories] = useState([]);

  // Load categories on component mount
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await fetchCategories(); // Fetch service categories
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load service categories.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      slug:
        name === "h1Title"
          ? slugify(value, { lower: true, strict: true })
          : prev.slug,
    }));
  };

  const handleImageChange = (e) => {
    setServiceImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    if (serviceImage) formDataToSend.append("image", serviceImage);

    try {
      await createService(formDataToSend);
      toast.success("Service added successfully!");
      navigate("/admin/manage-services");
    } catch (error) {
      console.error("Error adding service:", error);
      toast.error("Failed to add service.");
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content p-6 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Add Service</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            name="h1Title"
            value={formData.h1Title}
            onChange={handleChange}
            placeholder="H1 Title"
            required
            className="w-full p-2 border rounded mb-2"
          />

          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="Slug"
            required
            readOnly
            className="w-full p-3 border rounded-lg bg-gray-200 mb-2"
          />

          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            placeholder="Short Description"
            required
            className="w-full p-2 border rounded mb-2"
          />

          <input
            type="text"
            name="h2Title"
            value={formData.h2Title}
            onChange={handleChange}
            placeholder="H2 Title"
            required
            className="w-full p-2 border rounded mb-2"
          />

          <textarea
            name="paragraph1"
            value={formData.paragraph1}
            onChange={handleChange}
            placeholder="Paragraph 1"
            required
            className="w-full p-2 border rounded mb-2"
          />

          <textarea
            name="paragraph2"
            value={formData.paragraph2}
            onChange={handleChange}
            placeholder="Paragraph 2"
            required
            className="w-full p-2 border rounded mb-2"
          />

          {/* Category Dropdown */}
          <select
            name="serviceCategory"
            value={formData.serviceCategory}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mb-2"
          >
            <option value="">Select Service Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            type="file"
            onChange={handleImageChange}
            className="w-full p-2 border rounded mb-2"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Service
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddService;
