import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaFileAlt, FaBlog } from "react-icons/fa";
import Sidebar from "../../reuseable/Sidebar";

const Dashboard = () => {
  // State to store counts
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPages: 0,
    totalBlogs: 0,
  });

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Fetch dashboard data
  useEffect(() => {
    // Replace this with an actual API call
    const fetchData = async () => {
      try {
        // Example API request (replace with real API)
        // const response = await fetch("/api/dashboard-stats");
        // const data = await response.json();

        // Mock data for now
        const data = {
          totalUsers: 150,
          totalPages: 30,
          totalBlogs: 75,
        };

        setStats(data);
      } catch (error) {
        console.error("Error fetching dashboard stats", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Total Users */}
          <div className="bg-white p-6 shadow-md rounded-lg flex items-center">
            <FaUsers className="text-blue-500 text-4xl mr-4" />
            <div>
              <p className="text-gray-600">Total Users</p>
              <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
            </div>
          </div>

          {/* Total Pages */}
          <div className="bg-white p-6 shadow-md rounded-lg flex items-center">
            <FaFileAlt className="text-green-500 text-4xl mr-4" />
            <div>
              <p className="text-gray-600">Total Pages</p>
              <h3 className="text-2xl font-bold">{stats.totalPages}</h3>
            </div>
          </div>

          {/* Total Blogs */}
          <div className="bg-white p-6 shadow-md rounded-lg flex items-center">
            <FaBlog className="text-red-500 text-4xl mr-4" />
            <div>
              <p className="text-gray-600">Total Blogs</p>
              <h3 className="text-2xl font-bold">{stats.totalBlogs}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
