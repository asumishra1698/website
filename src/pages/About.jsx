import React from "react";
import SEO from "../reuseable/SEO";
import HeroSlider from "../reuseable/HeroSlider";

const About = () => {
  const aboutSlides = [
    {
      image: "https://iqsetters.com/assets/bg-image3.jpg",
      title: "About Us",
      description: "Empowering your business with cutting-edge technology.",
    },
  ];

  return (
    <>
      <HeroSlider slides={aboutSlides} />
      <div className="home-container">
        <SEO
          title="About Us Page | My Website"
          description="Learn more about our company."
        />
      </div>

      <section className="bg-gray-100 py-16">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-8 px-6">
          <div className="md:w-1/2">
            <img
              src="https://iqsetters.com/assets/bg-image4.jpg"
              alt="Our Mission"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our Mission
            </h2>
            <h3 className="text-xl font-semibold text-blue-600 mb-4">
              Driving Innovation and Excellence
            </h3>
            <p className="text-gray-600 leading-relaxed">
              At our company, we are committed to delivering innovative
              solutions that empower businesses to thrive in a competitive
              market. Our team of experts works tirelessly to ensure that our
              clients achieve their goals with cutting-edge technology and
              exceptional service.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white-100 py-16">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-8 px-6">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our Vision
            </h2>
            <h3 className="text-xl font-semibold text-blue-600 mb-4">
              Driving Innovation and Excellence
            </h3>
            <p className="text-gray-600 leading-relaxed">
              At our company, we are committed to delivering innovative
              solutions that empower businesses to thrive in a competitive
              market. Our team of experts works tirelessly to ensure that our
              clients achieve their goals with cutting-edge technology and
              exceptional service.
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://iqsetters.com/assets/bg-image4.jpg"
              alt="Our Mission"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
