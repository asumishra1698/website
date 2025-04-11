import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  fetchTestimonialById,
  updateTestimonial,
} from "../../../services/TestimonialService";
import Sidebar from "../../../reuseable/Sidebar";

const EditTestimonial = () => {
  const { id } = useParams(); // Get the testimonial ID from the URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    comment: "",
    rating: 5,
  });

  const [profileImage, setProfileImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch the testimonial data on component mount
  useEffect(() => {
    const loadTestimonial = async () => {
      try {
        const data = await fetchTestimonialById(id);
        setFormData({
          name: data.name || "",
          designation: data.designation || "",
          comment: data.comment || "",
          rating: data.rating || 5,
        });
        setExistingImage(data.profileImage || ""); // Store the existing profile image
      } catch (error) {
        console.error("Error fetching testimonial:", error);
        toast.error("Failed to load testimonial.");
      } finally {
        setLoading(false); // Ensure loading is set to false after data is fetched or if there's an error
      }
    };

    loadTestimonial();
  }, [id]);

  // Redirect to login if no token is found
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image selection
  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    if (profileImage) {
      formDataToSend.append("profileImage", profileImage); // Add the new profile image
    }

    try {
      await updateTestimonial(id, formDataToSend); // Call the corrected function
      toast.success("Testimonial updated successfully!");
      navigate("/admin/manage-testimonials");
    } catch (error) {
      console.error("Error updating testimonial:", error);
      toast.error("Failed to update testimonial.");
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <Sidebar />
        <main className="main-content p-6 bg-gray-100 min-h-screen">
          <h2 className="text-2xl font-bold mb-4">Edit Testimonial</h2>
          <p>Loading...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content p-6 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Edit Testimonial</h2>
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

          {existingImage && (
            <div className="mb-4">
              <p>Current Profile Image:</p>
              <img
                src={`${existingImage}`} // Ensure the correct base URL is used
                alt="Current Profile"
                className="h-24 w-24 object-cover rounded-full"
              />
            </div>
          )}

          <input
            type="file"
            onChange={handleImageChange}
            className="w-full p-2 border rounded mb-2"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update Testimonial
          </button>
        </form>
      </main>
    </div>
  );
};

export default EditTestimonial;
