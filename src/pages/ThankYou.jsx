import React from "react";
import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg mx-auto p-8 rounded-lg text-center">
        <h1 className="text-7xl font-extrabold text-blue-600 mb-4">
          Thank You!
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Your message has been sent successfully. We will get back to you soon.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
