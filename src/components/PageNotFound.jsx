import React from "react";
import { Link } from "react-router-dom";
import "./PageNotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-container flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-9xl font-extrabold text-blue-600 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mb-2">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 mb-6">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow hover:bg-blue-700 transition"
      >
        🔙 Go Home
      </Link>
    </div>
  );
};

export default NotFound;
