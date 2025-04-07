import React from "react";
import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-10 text-center">
      <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
      <p>Your message has been sent successfully. We will get back to you soon.</p>
      <Link to="/" className="text-blue-500 mt-4 inline-block">
        Go Back to Home
      </Link>
    </div>
  );
};

export default ThankYou;