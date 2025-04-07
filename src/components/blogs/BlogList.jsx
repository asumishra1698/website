import React, { useEffect, useState } from "react";
import { fetchAllBlogs, API_URL } from "../../services/BlogService";
import { useNavigate } from "react-router-dom";
import "./BlogList.css";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  // Fetch all blogs on component mount
  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await fetchAllBlogs();
        setBlogs(data);
      } catch (error) {
        console.error("Failed to load blogs:", error);
      }
    };

    loadBlogs();
  }, []);

  return (
    <div className="blog-list-container p-6">
      <h2 className="text-2xl font-bold mb-6">Latest Blogs</h2>

      {blogs.length === 0 ? (
        <p className="text-gray-500">No blogs available</p>
      ) : (
        <div className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="blog-card p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate(`/blogs/${blog.slug}`)}
            >
              {blog.image && typeof blog.image === "string" && (
                <img
                  src={
                    blog.image.startsWith("http")
                      ? blog.image
                      : `${API_URL.replace("/api/blogs", "")}${blog.image}`
                  }
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {blog.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {blog.content.substring(0, 100)}...
              </p>
              <button className="read-more px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Read More
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;
