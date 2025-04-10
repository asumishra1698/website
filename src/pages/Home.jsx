import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import HeroSlider from "../reuseable/HeroSlider";
import SEO from "../reuseable/SEO";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import { Plus, Minus } from "lucide-react";
import { fetchAllServices } from "../services/ServiceService";
import { fetchAllTestimonials } from "../services/TestimonialService";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Home = () => {
  const homeSlides = [
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

  const [openItem, setOpenItem] = useState(null);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleItem = (item) => {
    setOpenItem(openItem === item ? null : item);
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await fetchAllServices();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

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
      {/* Hero Slider */}
      <HeroSlider slides={homeSlides} />

      <SEO
        title="Professional Website Development Company | GonardWeb"
        description="website designing and development, eCommerce solutions, and legal services."
        canonical={"https://gonardweb.com"}
        keywords="website development, eCommerce solutions, UX/UI design, legal services, GonardWeb"
      />

      {/* About Section */}
      <section className="about py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">About Us</h2>
          <p className="text-lg text-gray-600">
            We are a technology-driven company providing top-notch eCommerce,
            UX/UI design, and legal services. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Voluptatum minus enim quaerat earum
            dignissimos in ratione blanditiis totam porro. Eveniet, at quasi?
            Praesentium adipisci itaque commodi provident ipsam ratione nemo
            voluptatem nam, nobis fuga est obcaecati corrupti voluptates.
            Accusamus, quasi.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="services py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Our Services
          </h2>
          {loading ? (
            <p className="text-center text-gray-500">Loading services...</p>
          ) : services.length === 0 ? (
            <p className="text-center text-gray-500">No services available.</p>
          ) : (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              loop={true}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {services.map((service) => (
                <SwiperSlide
                  key={service._id}
                  className="service-card bg-white shadow-lg rounded-lg p-6 text-center"
                >
                  <img
                    src={`http://localhost:5000/${service.image}`}
                    alt={service.h1Title}
                    className="h-40 w-full object-cover rounded-md mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {service.h1Title}
                  </h3>
                  <p className="text-gray-600">
                    {service.shortDescription?.substring(0, 100)}...
                  </p>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">
            What Our Clients Say
          </h2>
          {loading ? (
            <p className="text-gray-500">Loading testimonials...</p>
          ) : testimonials.length === 0 ? (
            <p className="text-gray-500">No testimonials available.</p>
          ) : (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              loop={true}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide
                  key={testimonial._id}
                  className="testimonial bg-white shadow-lg rounded-lg p-6 flex flex-col items-center"
                >
                  <img
                    src={`${testimonial.profileImage}`}
                    alt={testimonial.name}
                    className="w-24 h-24 rounded-full mb-4 mx-auto"
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
                    {[...Array(5 - parseInt(testimonial.rating))].map(
                      (_, i) => (
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
                      )
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
            Frequently Asked Questions
          </h2>

          <Accordion
            type="single"
            collapsible
            className="border border-gray-300 rounded-lg shadow-md"
          >
            {/* Item 1 */}
            <AccordionItem value="item-1">
              <AccordionTrigger
                className="w-full text-left p-5 bg-white hover:bg-gray-100 flex justify-between items-center text-lg font-medium border-b border-gray-200 transition rounded-t-lg"
                onClick={() => toggleItem("item-1")}
              >
                <span>What services do you offer?</span>
                {openItem === "item-1" ? (
                  <Minus size={24} />
                ) : (
                  <Plus size={24} />
                )}
              </AccordionTrigger>
              <AccordionContent className="p-5 bg-gray-100 text-gray-700">
                We offer eCommerce development, branding, SEO, and legal
                compliance solutions for businesses.
              </AccordionContent>
            </AccordionItem>

            {/* Item 2 */}
            <AccordionItem value="item-2">
              <AccordionTrigger
                className="w-full text-left p-5 bg-white hover:bg-gray-100 flex justify-between items-center text-lg font-medium border-b border-gray-200 transition"
                onClick={() => toggleItem("item-2")}
              >
                <span>How long does website development take?</span>
                {openItem === "item-2" ? (
                  <Minus size={24} />
                ) : (
                  <Plus size={24} />
                )}
              </AccordionTrigger>
              <AccordionContent className="p-5 bg-gray-100 text-gray-700">
                The development timeline depends on the complexity of the
                project. Typically, it takes 4-8 weeks.
              </AccordionContent>
            </AccordionItem>

            {/* Item 3 */}
            <AccordionItem value="item-3">
              <AccordionTrigger
                className="w-full text-left p-5 bg-white hover:bg-gray-100 flex justify-between items-center text-lg font-medium border-b border-gray-200 transition"
                onClick={() => toggleItem("item-3")}
              >
                <span>Do you provide post-launch support?</span>
                {openItem === "item-3" ? (
                  <Minus size={24} />
                ) : (
                  <Plus size={24} />
                )}
              </AccordionTrigger>
              <AccordionContent className="p-5 bg-gray-100 text-gray-700">
                Yes, we provide ongoing support, maintenance, and updates for
                your website and digital platforms.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* New Section: Our Expertise */}
      <section className="expertise py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Our Expertise
          </h2>
          <p className="text-center text-gray-600 mb-12">
            With over 5+ years of experience, we specialize in delivering
            innovative IT solutions tailored to your business needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Expertise Item 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="text-blue-600 text-4xl mb-4">
                <i className="fas fa-laptop-code"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Custom Software Development
              </h3>
              <p className="text-gray-600">
                We build scalable and robust software solutions tailored to your
                business requirements.
              </p>
            </div>

            {/* Expertise Item 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="text-red-600 text-4xl mb-4">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Data Analytics & Insights
              </h3>
              <p className="text-gray-600">
                Leverage data-driven insights to make informed business
                decisions and drive growth.
              </p>
            </div>

            {/* Expertise Item 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="text-green-600 text-4xl mb-4">
                <i className="fas fa-mobile-alt"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Mobile App Development
              </h3>
              <p className="text-gray-600">
                Create user-friendly mobile applications that enhance customer
                engagement and satisfaction.
              </p>
            </div>

            {/* Expertise Item 4 */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="text-purple-600 text-4xl mb-4">
                <i className="fas fa-cloud"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Cloud Solutions
              </h3>
              <p className="text-gray-600">
                Optimize your business operations with secure and scalable cloud
                solutions.
              </p>
            </div>

            {/* Expertise Item 5 */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="text-yellow-600 text-4xl mb-4">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Cybersecurity Services
              </h3>
              <p className="text-gray-600">
                Protect your business from cyber threats with our advanced
                security solutions.
              </p>
            </div>

            {/* Expertise Item 6 */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="text-indigo-600 text-4xl mb-4">
                <i className="fas fa-headset"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                IT Support & Maintenance
              </h3>
              <p className="text-gray-600">
                Ensure seamless operations with our reliable IT support and
                maintenance services.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
