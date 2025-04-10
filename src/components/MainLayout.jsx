import React from "react";
import Navbar from "../reuseable/Header";
import Footer from "../reuseable/Footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;