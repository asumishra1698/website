import React, { useState } from "react";
import axios from "axios";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    countryCode: "+91",
    phone: "",
    email: "",
    message: "",
    otp: "",
    isVerified: false,
  });
  const [sentOTP, setSentOTP] = useState("");
  const [showOTPField, setShowOTPField] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendOTP = async () => {
    const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
    setSentOTP(generatedOTP);

    try {
      await axios.post("https://www.smscountry.com/sendOTP", {
        phone: formData.countryCode + formData.phone,
        otp: generatedOTP,
      });
      alert("OTP sent successfully!");
      setShowOTPField(true);
    } catch (error) {
      console.error("Error sending OTP", error);
      alert("Failed to send OTP. Try again.");
    }
  };

  const verifyOTP = () => {
    if (formData.otp === sentOTP) {
      alert("OTP Verified Successfully!");
      setFormData({ ...formData, isVerified: true });
    } else {
      alert("Incorrect OTP. Try again!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.isVerified) {
      alert("Please verify OTP before submitting!");
      return;
    }

    try {
      await axios.post("/api/contact", formData);
      alert("Message Sent Successfully!");
    } catch (error) {
      console.error("Error submitting form", error);
      alert("Failed to send message.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 border rounded mb-2"
          required
        />
        <div className="flex gap-2">
          <select
            name="countryCode"
            value={formData.countryCode}
            onChange={handleChange}
            className="p-2 border rounded"
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
            className="flex-1 p-2 border rounded"
            required
          />
          <button
            type="button"
            onClick={sendOTP}
            className="bg-blue-500 text-white px-3 py-2 rounded"
          >
            Send OTP
          </button>
        </div>
        {showOTPField && (
          <div className="mt-2">
            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              placeholder="Enter OTP"
              className="w-full p-2 border rounded mb-2"
              required
            />
            <button
              type="button"
              onClick={verifyOTP}
              className="bg-green-500 text-white px-3 py-2 rounded"
            >
              Verify OTP
            </button>
          </div>
        )}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded mb-2"
          required
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          className="w-full p-2 border rounded mb-2"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
