import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchBlogBySlug,
  fetchRelatedBlogs,
  API_URL,
} from "../../services/BlogService";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      navigate("/404", { replace: true });
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchBlog = async () => {
      try {
        // Fetch the blog details by slug
        const data = await fetchBlogBySlug(slug, { signal });
        if (data) {
          setBlog(data);
          document.title = data.title || "Blog Details";

          // Fetch related blogs using the service API
          const related = await fetchRelatedBlogs(data.category?._id, slug);
          setRelatedBlogs(related);
        } else {
          navigate("/404", { replace: true });
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Fetch error:", error);
          navigate("/404", { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();

    return () => controller.abort();
  }, [slug, navigate]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-white shadow-lg rounded-l">
      <button
        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        onClick={() => navigate(-1)}
      >
        ⬅ Back
      </button>

      {blog ? (
        <>
          <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
          <p className="text-gray-600 mb-4">
            <strong>Category:</strong>{" "}
            {blog.category ? blog.category.name : "No Category"} |{" "}
            <strong>By:</strong> {blog.author} | <strong>Published on:</strong>{" "}
            {blog.createdAt
              ? new Date(blog.createdAt).toLocaleDateString()
              : "N/A"}
          </p>

          {blog.image && typeof blog.image === "string" && (
            <img
              src={
                blog.image.startsWith("http")
                  ? blog.image
                  : `${API_URL.replace("/api/blogs", "")}${blog.image}`
              }
              alt={blog.title}
              className="w-full mx-auto rounded-lg shadow-md object-cover mb-6"
            />
          )}

          <div
            className="blog-content text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Related Blogs Section */}
          {relatedBlogs.length > 0 && (
            <section className="related-blogs mt-12">
              <h2 className="text-2xl font-bold mb-6">Related Blogs</h2>
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
              >
                {relatedBlogs.map((relatedBlog) => (
                  <SwiperSlide key={relatedBlog._id}>
                    <div
                      className="related-blog-card bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => navigate(`/blogs/${relatedBlog.slug}`)}
                    >
                      {relatedBlog.image && (
                        <img
                          src={
                            relatedBlog.image.startsWith("http")
                              ? relatedBlog.image
                              : `${API_URL.replace("/api/blogs", "")}${
                                  relatedBlog.image
                                }`
                          }
                          alt={relatedBlog.title}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {relatedBlog.title}
                        </h3>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </section>
          )}
        </>
      ) : (
        <p className="text-gray-500">Blog not found.</p>
      )}
    </div>
  );
};

export default BlogDetails;
