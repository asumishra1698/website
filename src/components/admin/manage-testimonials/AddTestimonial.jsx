import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createTestimonial } from "../../../services/TestimonialService";
import Sidebar from "../../../reuseable/Sidebar";

const AddTestimonial = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    comment: "",
    rating: 5,
  });

  const [profileImage, setProfileImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    if (profileImage) formDataToSend.append("profileImage", profileImage);

    try {
      await createTestimonial(formDataToSend);
      toast.success("Testimonial added successfully!");
      navigate("/admin/manage-testimonials");
    } catch (error) {
      console.error("Error adding testimonial:", error);
      toast.error("Failed to add testimonial.");
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content p-6 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Add Testimonial</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="w-full p-2 border rounded mb-2"
          />

          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder="Designation"
            required
            className="w-full p-2 border rounded mb-2"
          />

          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="Comment"
            required
            className="w-full p-2 border rounded mb-2"
          />

          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mb-2"
          >
            <option value="">Select Rating</option>
            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>
                {rating} Star{rating > 1 ? "s" : ""}
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
            Add Testimonial
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddTestimonial;
