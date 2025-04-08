import React, { useState } from "react";
import { createContact } from "../services/ContactService";
import { useNavigate } from "react-router-dom";
import SEO from "../reuseable/SEO";
import HeroSlider from "../reuseable/HeroSlider";

const ContactUs = () => {
  const contactSlides = [
    {
      image: "https://iqsetters.com/assets/bg-image3.jpg",
      title: "Contact Us",
      description: "Empowering your business with cutting-edge technology.",
    },
  ];

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
    <>
      <HeroSlider slides={contactSlides} />
      <SEO
        title="Contact Us Page | My Website"
        description="Contact Us for inquiries, support, and assistance. We're here to help you!"
      />
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto p-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Get in Touch with Us
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Details and Map */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                Contact Information
              </h3>
              <p className="text-gray-600 mb-6">
                Feel free to reach out to us for any inquiries or assistance.
                We're here to help!
              </p>
              <div className="mb-4">
                <h4 className="text-lg font-medium text-gray-700">Phone</h4>
                <p className="text-gray-600">+1 (123) 456-7890</p>
              </div>
              <div className="mb-4">
                <h4 className="text-lg font-medium text-gray-700">Email</h4>
                <p className="text-gray-600">support@example.com</p>
              </div>
              <div className="mb-4">
                <h4 className="text-lg font-medium text-gray-700">Address</h4>
                <p className="text-gray-600">123 Main Street, City, Country</p>
              </div>
              <div className="mt-6">
                <iframe
                  title="Google Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509374!2d-122.4194154846815!3d37.77492927975971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064f8f8f8f8%3A0x8f8f8f8f8f8f8f8f!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1616161616161!5m2!1sen!2sus"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                Send Us a Message
              </h3>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
