import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllServices } from "../../services/ServiceService";

const ServiceGrid = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchAllServices();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading services...</p>;
  }

  if (services.length === 0) {
    return <p className="text-center text-gray-500">No services available.</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Our Services
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col"
          >
            <img
              src={`http://localhost:5000/${service.image}`}
              alt={service.h1Title}
              className="h-40 w-full object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {service.h1Title}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {service.shortDescription?.substring(0, 100)}...
            </p>
            <Link
              to={`/services/${service.slug}`}
              className="mt-auto bg-blue-500 text-white px-4 py-2 rounded text-center hover:bg-blue-600 transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceGrid;
