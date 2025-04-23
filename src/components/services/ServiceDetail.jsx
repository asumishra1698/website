import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchServiceBySlug } from "../../services/ServiceService";
import HeroSlider from "../../reuseable/HeroSlider";
import SEO from "../../reuseable/SEO";
import ServiceSidebar from "./ServiceSidebar";
import { getAllClients } from "../../services/ClientService";
import { BASE_URL } from "../../config";

const ServiceDetail = () => {
  const { slug } = useParams(); // Get the slug from the URL
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const loadClients = async () => {
      try {
        const data = await getAllClients();
        setClients(data);
      } catch (error) {
        console.error("Error loading clients:", error);
      }
    };

    loadClients();
  }, []);

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

  const serviceSlides = [
    {
      image: "https://iqsetters.com/assets/bg-image3.jpg",
      title: service.h1Title,
      description: "Empowering your business with cutting-edge technology.",
    },
  ];

  return (
    <>
      <HeroSlider slides={serviceSlides} />
      <SEO title={service.h1Title} description={service.shortDescription} />
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <img
              src={`${BASE_URL}/${service.image}`}
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
        <ServiceSidebar />
      </div>
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">Our Trusted Clients</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {clients.map((client, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-1 flex flex-col items-center justify-center"
              >
                <img
                  src={`${BASE_URL}/uploads/clients/${client.clientImage}`}
                  alt={client.clientName}
                  className="max-w-full max-h-full object-contain"
                  style={{ width: "200px", height: "80px" }}
                />
                {/* <h3 className="mt-4 text-lg font-semibold">
                        {client.clientName}
                      </h3> */}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceDetail;
