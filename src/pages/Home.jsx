import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import HeroSlider from "../reuseable/HeroSlider";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import { Plus, Minus } from "lucide-react";
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

  const toggleItem = (item) => {
    setOpenItem(openItem === item ? null : item);
  };

  return (
    <div className="home-container">
      {/* Hero Slider */}
      <HeroSlider slides={homeSlides} />

      {/* About Section */}
      <section className="about py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 text-center">
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
      <section className="services py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Our Services
          </h2>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            <SwiperSlide className="service-card bg-white shadow-lg rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Web Development
              </h3>
              <p className="text-gray-600">
                Custom websites with modern UX/UI.
              </p>
            </SwiperSlide>
            <SwiperSlide className="service-card bg-white shadow-lg rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                E-Commerce Solutions
              </h3>
              <p className="text-gray-600">End-to-end eCommerce development.</p>
            </SwiperSlide>
            <SwiperSlide className="service-card bg-white shadow-lg rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                SEO Optimization
              </h3>
              <p className="text-gray-600">Boost your online presence.</p>
            </SwiperSlide>
            <SwiperSlide className="service-card bg-white shadow-lg rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Digital Marketing
              </h3>
              <p className="text-gray-600">
                Business registrations and compliance.
              </p>
            </SwiperSlide>
            <SwiperSlide className="service-card bg-white shadow-lg rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Shopify Store Design
              </h3>
              <p className="text-gray-600">
                Business registrations and compliance.
              </p>
            </SwiperSlide>
            <SwiperSlide className="service-card bg-white shadow-lg rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Wordpress Store Design
              </h3>
              <p className="text-gray-600">
                Business registrations and compliance.
              </p>
            </SwiperSlide>
            <SwiperSlide className="service-card bg-white shadow-lg rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Meta Ads
              </h3>
              <p className="text-gray-600">
                Business registrations and compliance.
              </p>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="testimonial bg-white shadow-lg rounded-lg p-6">
              <p className="text-gray-600 mb-4">
                "Excellent service and support! Highly recommended."
              </p>
              <h4 className="text-lg font-semibold text-gray-800">
                - John Doe, CEO of TechCorp
              </h4>
            </div>
            <div className="testimonial bg-white shadow-lg rounded-lg p-6">
              <p className="text-gray-600 mb-4">
                "Their team helped us scale our business efficiently."
              </p>
              <h4 className="text-lg font-semibold text-gray-800">
                - Jane Smith, Founder of E-Shop
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
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
    </div>
  );
};

export default Home;
