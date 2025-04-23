import React, { useEffect, useState } from "react";
import { fetchAllBlogs, API_URL } from "../../services/BlogService";
import { useNavigate } from "react-router-dom";
import SEO from "../../reuseable/SEO";
import HeroSlider from "../../reuseable/HeroSlider";

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

  const blogSlides = [
    {
      image: "https://iqsetters.com/assets/bg-image3.jpg",
      title: "Latest Blogs",
      description: "Empowering your business with cutting-edge technology.",
    },
    {
      image: "https://iqsetters.com/assets/bg-image3.jpg",
      title: "Latest Blogs",
      description: "Empowering your business with cutting-edge technology.",
    },
    {
      image: "https://iqsetters.com/assets/bg-image3.jpg",
      title: "Latest Blogs",
      description: "Empowering your business with cutting-edge technology.",
    },
    {
      image: "https://iqsetters.com/assets/bg-image3.jpg",
      title: "Latest Blogs",
      description: "Empowering your business with cutting-edge technology.",
    },
  ];

  return (
    <>
      <HeroSlider slides={blogSlides} />
      <SEO
        title="Latest Blogs | My Website"
        description="Latest Blogs and Articles"
        keywords="latest blogs, articles, technology, business, GonardWeb"
        canonical={"https://gonardweb.com/blogs"}
        />
      <div className="p-6 lg:p-12 bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Latest Blogs
        </h2>

        {blogs.length === 0 ? (
          <p className="text-gray-500 text-center">No blogs available</p>
        ) : (
          <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition duration-300"
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
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {blog.content.substring(0, 100)}...
                  </p>
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition">
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default BlogList;
