import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {BASE_URL} from "../../config"
import {
  FaUsers,
  FaFileAlt,
  FaBlog,
  FaBox,
  FaStar,
  FaServicestack,
} from "react-icons/fa";
import Sidebar from "../../reuseable/Sidebar";

const Dashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPages: 0,
    totalBlogs: 0,
    totalProducts: 0,
    totalTestimonials: 0,
    totalServices: 0,
    totalBlogCategories: 0,
    totalProductCategories: 0,
    totalContacts: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/dashboard/stats`);
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching dashboard stats", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 shadow-md rounded-lg flex items-center">
            <FaUsers className="text-blue-500 text-4xl mr-4" />
            <div>
              <p className="text-gray-600">Total Users</p>
              <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
            </div>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg flex items-center">
            <FaFileAlt className="text-green-500 text-4xl mr-4" />
            <div>
              <p className="text-gray-600">Total Pages</p>
              <h3 className="text-2xl font-bold">{stats.totalPages}</h3>
            </div>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg flex items-center">
            <FaBlog className="text-red-500 text-4xl mr-4" />
            <div>
              <p className="text-gray-600">Total Blogs</p>
              <h3 className="text-2xl font-bold">{stats.totalBlogs}</h3>
            </div>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg flex items-center">
            <FaBox className="text-purple-500 text-4xl mr-4" />
            <div>
              <p className="text-gray-600">Total Products</p>
              <h3 className="text-2xl font-bold">{stats.totalProducts}</h3>
            </div>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg flex items-center">
            <FaStar className="text-yellow-500 text-4xl mr-4" />
            <div>
              <p className="text-gray-600">Total Testimonials</p>
              <h3 className="text-2xl font-bold">{stats.totalTestimonials}</h3>
            </div>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg flex items-center">
            <FaServicestack className="text-teal-500 text-4xl mr-4" />
            <div>
              <p className="text-gray-600">Total Services</p>
              <h3 className="text-2xl font-bold">{stats.totalServices}</h3>
            </div>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg flex items-center">
            <FaBlog className="text-indigo-500 text-4xl mr-4" />
            <div>
              <p className="text-gray-600">Total Blog Categories</p>
              <h3 className="text-2xl font-bold">
                {stats.totalBlogCategories}
              </h3>
            </div>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg flex items-center">
            <FaBox className="text-orange-500 text-4xl mr-4" />
            <div>
              <p className="text-gray-600">Total Product Categories</p>
              <h3 className="text-2xl font-bold">
                {stats.totalProductCategories}
              </h3>
            </div>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg flex items-center">
            <FaUsers className="text-pink-500 text-4xl mr-4" />
            <div>
              <p className="text-gray-600">Total Contacts</p>
              <h3 className="text-2xl font-bold">{stats.totalContacts}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
