import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchServiceBySlug } from "../../services/ServiceService";
import HeroSlider from "../../reuseable/HeroSlider";
import SEO from "../../reuseable/SEO";

const ServiceDetail = () => {
  const { slug } = useParams(); // Get the slug from the URL
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadService = async () => {
      try {
        const data = await fetchServiceBySlug(slug); // Fetch service by slug
        setService(data);
      } catch (error) {
        console.error("Error fetching service:", error);
      } finally {
        setLoading(false);
      }
    };

    loadService();
  }, [slug]);

  if (loading) {
    return (
      <p className="text-center text-gray-500">Loading service details...</p>
    );
  }

  if (!service) {
    return <p className="text-center text-gray-500">Service not found.</p>;
  }

  const aboutSlides = [
    {
      image: "https://iqsetters.com/assets/bg-image3.jpg",
      title: service.h1Title,
      description: "Empowering your business with cutting-edge technology.",
    },
  ];

  return (
    <>
      <HeroSlider slides={aboutSlides} />
      <SEO title={service.h1Title} description={service.shortDescription} />
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <img
              src={`http://localhost:5000/${service.image}`}
              alt={service.h1Title}
              className="w-full h-64 object-cover rounded-md mb-6"
            />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {service.h1Title}
            </h1>
            <p className="text-gray-600 mb-4">{service.shortDescription}</p>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              {service.h2Title}
            </h2>
            <p className="text-gray-600 mb-4">{service.paragraph1}</p>
            <p className="text-gray-600">{service.paragraph2}</p>
          </div>
        </main>

        {/* Sidebar */}
        <aside className="w-full lg:w-1/4 bg-white shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Related Services
          </h3>
          <ul className="space-y-4">
            <li>
              <a href="#" className="text-blue-600 hover:underline">
                Service 1
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">
                Service 2
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">
                Service 3
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </>
  );
};

export default ServiceDetail;
