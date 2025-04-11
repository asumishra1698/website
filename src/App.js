import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./components/PageNotFound";
import MainLayout from "./components/MainLayout";

import ScrollToTop from "./reuseable/ScrollToTop";
import Dashboard from "./components/admin/Dashboard";
import Users from "./components/admin/Users";

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import OTPVerification from "./components/Auth/OTPVerification";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ThankYou from "./pages/ThankYou";

import ManageBlogCategories from "./components/admin/manage-blogs/ManageBlogCategories";
import AddEditBlogCategory from "./components/admin/manage-blogs/AddEditBlogCategory";

import { BlogList, BlogDetails } from "./components/blogs";
import ManageBlogs from "./components/admin/manage-blogs/ManageBlogs";
import AddBlog from "./components/admin/manage-blogs/AddBlog";
import EditBlog from "./components/admin/manage-blogs/EditBlog";

import ManageProduct from "./components/admin/manage-products/ManageProduct";
import AddProduct from "./components/admin/manage-products/AddProduct";
import BulkUploadProducts from "./components/admin/manage-products/BulkUploadproducts";
import EditProduct from "./components/admin/manage-products/EditProduct";

import AddProductCategory from "./components/admin/manage-products/AddProductCategory";
import AddSubProductCategory from "./components/admin/manage-products/AddSubProductCategory";

import ManageContacts from "./components/admin/manage-contacts/ManageContacts";

import ProductGrid from "./components/products/ProductGrid";
import ProductDetails from "./components/products/ProductDetails";

import AddService from "./components/admin/manage-services/AddService";
import ManageServiceCategories from "./components/admin/manage-services/ManageServiceCategories";
import ManageService from "./components/admin/manage-services/ManageService";
import EditService from "./components/admin/manage-services/EditService";
import ServiceDetail from "./components/services/ServiceDetail";
import ServiceGrid from "./components/services/ServiceGrid";

import AddTestimonial from "./components/admin/manage-testimonials/AddTestimonial";
import ManageTestimonials from "./components/admin/manage-testimonials/ManageTestimonials"; // Create this component for listing testimonials
import EditTestimonial from "./components/admin/manage-testimonials/EditTestimonial";

import "./App.css";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/about"
          element={
            <MainLayout>
              <About />
            </MainLayout>
          }
        />

        <Route
          path="/contact"
          element={
            <MainLayout>
              <Contact />
            </MainLayout>
          }
        />
        <Route
          path="/thank-you"
          element={
            <MainLayout>
              <ThankYou />
            </MainLayout>
          }
        />
        <Route
          path="/blogs"
          element={
            <MainLayout>
              <BlogList />
            </MainLayout>
          }
        />
        <Route
          path="/all-products"
          element={
            <MainLayout>
              <ProductGrid />
            </MainLayout>
          }
        />
        <Route
          path="/product/:id"
          element={
            <MainLayout>
              <ProductDetails />
            </MainLayout>
          }
        />
        <Route
          path="/blogs/:slug"
          element={
            <MainLayout>
              <BlogDetails />
            </MainLayout>
          }
        />
        <Route
          path="/services/:slug"
          element={
            <MainLayout>
              <ServiceDetail />
            </MainLayout>
          }
        />
        <Route
          path="/services"
          element={
            <MainLayout>
              <ServiceGrid />
            </MainLayout>
          }
        />

        <Route path="*" element={<NotFound />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/admin/manage-contacts" element={<ManageContacts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-otp" element={<OTPVerification />} />
        <Route
          path="/admin/manage-blog-categories"
          element={<ManageBlogCategories />}
        />
        <Route
          path="/admin/add-blog-category"
          element={<AddEditBlogCategory />}
        />
        <Route
          path="/admin/edit-blog-category/:id"
          element={<AddEditBlogCategory />}
        />
        <Route path="/admin/manage-blogs" element={<ManageBlogs />} />
        <Route path="/admin/add-blog" element={<AddBlog />} />
        <Route path="/admin/edit-blog/:slug" element={<EditBlog />} />
        <Route path="/admin/manage-product" element={<ManageProduct />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route
          path="/admin/products/bulk-upload"
          element={<BulkUploadProducts />}
        />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/admin/add-category" element={<AddProductCategory />} />
        <Route
          path="/admin/add-subcategory"
          element={<AddSubProductCategory />}
        />
        <Route path="/admin/add-service" element={<AddService />} />
        <Route
          path="/admin/manage-service-categories"
          element={<ManageServiceCategories />}
        />
        <Route path="/admin/manage-services" element={<ManageService />} />
        <Route path="/edit-service/:slug" element={<EditService />} />
        <Route path="/admin/add-testimonial" element={<AddTestimonial />} />
        <Route
          path="/admin/manage-testimonials"
          element={<ManageTestimonials />}
        />
        <Route
          path="/admin/edit-testimonial/:id"
          element={<EditTestimonial />}
        />
      </Routes>
    </Router>
  );
};

export default App;
