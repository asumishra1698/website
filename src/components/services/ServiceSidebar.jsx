import React, { useState } from "react";
import { createContact } from "../../services/ContactService";
import { useNavigate } from "react-router-dom";

const ServiceSidebar = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    countryCode: "+91",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createContact(formData);
      navigate("/thank-you");
    } catch (error) {
      console.error("Error submitting form", error);
      alert("Failed to send message.");
    }
  };

  return (
    <aside className="w-full lg:w-1/4 bg-white shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Related Services</h3>
      <ul className="space-y-4 mb-6">
        <li>
          <a href="/" className="text-blue-600 hover:underline">
            Service 1
          </a>
        </li>
        <li>
          <a href="/" className="text-blue-600 hover:underline">
            Service 2
          </a>
        </li>
        <li>
          <a href="/" className="text-blue-600 hover:underline">
            Service 3
          </a>
        </li>
      </ul>

      <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Us</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="w-full p-3 border rounded mb-4"
          required
        />
        <div className="flex gap-4 mb-4">
          <select
            name="countryCode"
            value={formData.countryCode}
            onChange={handleChange}
            className="p-3 border rounded w-1/4"
          >
            <option value="+91">+91 (India)</option>
            <option value="+1">+1 (USA)</option>
            <option value="+44">+44 (UK)</option>
          </select>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="p-3 border rounded w-3/4"
            required
          />
        </div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="w-full p-3 border rounded mb-4"
          required
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          className="w-full p-3 border rounded mb-4"
          rows="5"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded w-full hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </aside>
  );
};

export default ServiceSidebar;
