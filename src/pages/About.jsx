import React from "react";
import SEO from "../reuseable/SEO";
import HeroSlider from "../reuseable/HeroSlider";

const About = () => {
  const aboutSlides = [
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
  return (
    <>
      <HeroSlider slides={aboutSlides} />
      <div className="home-container">
        <SEO
          title="About Us Page | My Website"
          description="Learn more about our company."
        />
        <h1>About Us</h1>
        <p>Your one-stop solution for all services.</p>

        <button className="explore-btn">Explore Now</button>
      </div>
    </>
  );
};

export default About;
