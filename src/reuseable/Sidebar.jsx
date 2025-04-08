import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaThList,
  FaBlog,
  FaConciergeBell,
  FaFileAlt,
  FaBoxes,
  FaBoxOpen,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen">
      <div className="p-5">
        <h3 className="text-2xl font-semibold mb-5">
          <Link to="/dashboard" className="hover:text-gray-300">
            Dashboard Menu
          </Link>
        </h3>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link
                to="/users"
                className="flex items-center p-2 hover:bg-gray-700 rounded"
              >
                <FaUsers className="mr-3" />
                Users
              </Link>
            </li>
            <li>
              <Link
                to="/admin/manage-blog-categories"
                className="flex items-center p-2 hover:bg-gray-700 rounded"
              >
                <FaThList className="mr-3" />
                Blog Categories
              </Link>
            </li>
            <li>
              <Link
                to="/admin/manage-blogs"
                className="flex items-center p-2 hover:bg-gray-700 rounded"
              >
                <FaBlog className="mr-3" />
                Blogs
              </Link>
            </li>
            <li>
              <Link
                to="/admin/add-category"
                className="flex items-center p-2 hover:bg-gray-700 rounded"
              >
                <FaBoxes className="mr-3" />
                Product Categories
              </Link>
            </li>
            <li>
              <Link
                to="/admin/manage-product"
                className="flex items-center p-2 hover:bg-gray-700 rounded"
              >
                <FaBoxOpen className="mr-3" />
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/admin/manage-contacts"
                className="flex items-center p-2 hover:bg-gray-700 rounded"
              >
                <FaConciergeBell className="mr-3" />
                All Contacts
              </Link>
            </li>
            <li>
              <Link
                to="/admin/manage-service-categories"
                className="flex items-center p-2 hover:bg-gray-700 rounded"
              >
                <FaFileAlt className="mr-3" />
                Services Categories
              </Link>
            </li>

            <li>
              <Link
                to="/admin/manage-services"
                className="flex items-center p-2 hover:bg-gray-700 rounded"
              >
                <FaFileAlt className="mr-3" />
                Services
              </Link>
            </li>

            <li>
              <button
                onClick={handleLogout}
                className="flex items-center p-2 w-full text-left hover:bg-gray-700 rounded"
              >
                <FaSignOutAlt className="mr-3" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
