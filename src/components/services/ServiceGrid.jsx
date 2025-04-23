import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllServices } from "../../services/ServiceService";
import SEO from "../../reuseable/SEO";
import HeroSlider from "../../reuseable/HeroSlider";
import { BASE_URL } from "../../config";

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

  const serviceSlides = [
    {
      image: "https://iqsetters.com/assets/bg-image3.jpg",
      title: "All Services",
      description: "Empowering your business with cutting-edge technology.",
    },
    {
      image: "https://iqsetters.com/assets/bg-image3.jpg",
      title: "All Services",
      description: "Empowering your business with cutting-edge technology.",
    },
    {
      image: "https://iqsetters.com/assets/bg-image3.jpg",
      title: "All Services",
      description: "Empowering your business with cutting-edge technology.",
    },
    {
      image: "https://iqsetters.com/assets/bg-image3.jpg",
      title: "All Services",
      description: "Empowering your business with cutting-edge technology.",
    },
  ];

  return (
    <>
      <HeroSlider slides={serviceSlides} />
      <SEO
        title="Services | GonardWeb"
        description="website designing and development, eCommerce solutions, and legal services."
        canonical={"https://gonardweb.com/contact"}
        keywords="website development, eCommerce solutions, UX/UI design, legal services, GonardWeb"
      />
      <div className="p-6 lg:p-12 bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Our Services
        </h1>
        <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col"
            >
              <img
                src={`${BASE_URL}/${service.image}`}
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
    </>
  );
};

export default ServiceGrid;
