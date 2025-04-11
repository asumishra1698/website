import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  fetchServiceBySlug,
  updateService,
} from "../../../services/ServiceService";
import { fetchCategories } from "../../../services/ServiceCategoryService";
import Sidebar from "../../../reuseable/Sidebar";

const EditService = () => {
  const { slug } = useParams(); // Get the service slug from the URL
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState({
    h1Title: "",
    shortDescription: "",
    h2Title: "",
    paragraph1: "",
    paragraph2: "",
    slug: "",
    serviceCategory: "",
  });

  // State for service image and categories
  const [serviceImage, setServiceImage] = useState(null);
  const [categories, setCategories] = useState([]);

  // Fetch service details by slug
  const loadService = useCallback(async () => {
    try {
      const data = await fetchServiceBySlug(slug);
      setFormData({
        h1Title: data.h1Title,
        shortDescription: data.shortDescription,
        h2Title: data.h2Title,
        paragraph1: data.paragraph1,
        paragraph2: data.paragraph2,
        slug: data.slug,
        serviceCategory: data.serviceCategory || "",
      });
    } catch (error) {
      console.error("Error fetching service:", error);
      toast.error("Failed to load service.");
    }
  }, [slug]);

  // Fetch service categories
  const loadCategories = useCallback(async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load service categories.");
    }
  }, []);

  // Load service and categories on component mount
  useEffect(() => {
    loadService();
    loadCategories();
  }, [loadService, loadCategories]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image file input
  const handleImageChange = (e) => {
    setServiceImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    if (serviceImage) formDataToSend.append("image", serviceImage);

    try {
      await updateService(slug, formDataToSend);

      navigate("/admin/manage-services");
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content p-6 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Edit Service</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* H1 Title */}
          <input
            type="text"
            name="h1Title"
            value={formData.h1Title}
            onChange={handleChange}
            placeholder="H1 Title"
            required
            className="w-full p-2 border rounded mb-2"
          />

          {/* Slug */}
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

          {/* Short Description */}
          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            placeholder="Short Description"
            required
            className="w-full p-2 border rounded mb-2"
          />

          {/* H2 Title */}
          <input
            type="text"
            name="h2Title"
            value={formData.h2Title}
            onChange={handleChange}
            placeholder="H2 Title"
            required
            className="w-full p-2 border rounded mb-2"
          />

          {/* Paragraph 1 */}
          <textarea
            name="paragraph1"
            value={formData.paragraph1}
            onChange={handleChange}
            placeholder="Paragraph 1"
            required
            className="w-full p-2 border rounded mb-2"
          />

          {/* Paragraph 2 */}
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

          {/* Image Upload */}
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full p-2 border rounded mb-2"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update Service
          </button>
        </form>
      </main>
    </div>
  );
};

export default EditService;
