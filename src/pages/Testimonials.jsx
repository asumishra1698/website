import React, { useState, useEffect } from "react";
import HeroSlider from "../reuseable/HeroSlider";
import SEO from "../reuseable/SEO";
import { fetchAllTestimonials } from "../services/TestimonialService";

const Testimonials = () => {
  const testimonialsSlides = [
    {
      image: "https://iqsetters.com/assets/bg-image3.jpg",
      title: "Innovative Solutions for Your Business",
      description: "Empowering your business with cutting-edge technology.",
    },
    {
      image: "https://iqsetters.com/assets/bg-image4.jpg",
      title: "Scalable eCommerce Development",
      description: "We create seamless and user-friendly online stores.",
    },
    {
      image: "https://iqsetters.com/assets/bg-image2.jpg",
      title: "Legal & Compliance Made Easy",
      description: "Your one-stop solution for business legal needs.",
    },
  ];

  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await fetchAllTestimonials();
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <div className="home-container">
      <HeroSlider slides={testimonialsSlides} />

      <SEO
        title="Professional Website Development Company | GonardWeb"
        description="website designing and development, eCommerce solutions, and legal services."
        canonical={"https://gonardweb.com"}
        keywords="website development, eCommerce solutions, UX/UI design, legal services, GonardWeb"
      />

      <section className="testimonials py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">
            What Our Clients Say
          </h2>
          {loading ? (
            <p className="text-gray-500 text-center">Loading testimonials...</p>
          ) : testimonials.length === 0 ? (
            <p className="text-gray-500 text-center">No testimonials available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial._id}
                  className="testimonial bg-white shadow-lg rounded-lg p-6 flex flex-col items-center"
                >
                  <img
                    src={`${testimonial.profileImage}`}
                    alt={testimonial.name}
                    className="w-24 h-24 rounded-full mb-4"
                  />
                  <h4 className="text-lg font-semibold text-gray-800">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500 mb-2">
                    {testimonial.designation}
                  </p>
                  <p className="text-gray-600 mb-4">{testimonial.comment}</p>
                  <div className="flex justify-center">
                    {[...Array(parseInt(testimonial.rating))].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 text-yellow-500"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                    {[...Array(5 - parseInt(testimonial.rating))].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 text-gray-300"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Testimonials;