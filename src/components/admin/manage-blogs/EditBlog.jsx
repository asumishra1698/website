import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import slugify from "slugify";
import Sidebar from "../../../reuseable/Sidebar";
import {
  fetchBlogBySlug,
  updateBlog,
  API_URL,
} from "../../../services/BlogService";
import { fetchBlogCategories } from "../../../services/BlogCategoryService";
import "../Dashboard.css";

const EditBlog = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [blog, setBlog] = useState({
    title: "",
    slug: "",
    content: "",
    author: "",
    image: "",
    category: "",
    publishedAt: new Date().toISOString().slice(0, 16),
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch blog categories
  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchBlogCategories();
        setCategories(data);
      } catch (error) {
        toast.error("Failed to load blog categories");
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    const loadBlog = async () => {
      try {
        const data = await fetchBlogBySlug(slug);
        if (!data) {
          toast.error("Blog not found");
          navigate("/admin/manage-blogs");
          return;
        }

        setBlog({
          title: data.title || "",
          slug: data.slug || "",
          content: data.content || "",
          author: data.author || "",
          publishedAt: data.publishedAt
            ? new Date(data.publishedAt).toISOString().slice(0, 16)
            : new Date().toISOString().slice(0, 16),
          image: data.image || "",
          category: data.category?._id || "",
        });

        setImagePreview(data.image ? data.image : null);
      } catch (error) {
        toast.error("Error fetching blog details");
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [slug, navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prev) => ({
      ...prev,
      [name]: value,
      slug:
        name === "title"
          ? slugify(value, { lower: true, strict: true })
          : prev.slug,
    }));
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBlog((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Remove selected image
  const handleImageRemove = () => {
    setImagePreview(null);
    setBlog((prev) => ({
      ...prev,
      image: null,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", blog.title);
      formData.append("slug", blog.slug);
      formData.append("content", blog.content);
      formData.append("author", blog.author);
      formData.append("category", blog.category);
      formData.append("publishedAt", new Date(blog.publishedAt).toISOString());

      if (blog.image && typeof blog.image !== "string") {
        formData.append("image", blog.image);
      }

      await updateBlog(blog.slug, formData);

      toast.success("Blog updated successfully!");
      navigate("/admin/manage-blogs");
    } catch (error) {
      toast.error(error.message || "Error updating blog post");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <h2>Edit Blog</h2>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="bg-white p-6 rounded-lg space-y-4"
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={blog.title}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="text"
            name="slug"
            placeholder="Slug (auto-generated)"
            value={blog.slug}
            readOnly
            className="w-full p-3 border rounded-lg bg-gray-200"
          />
          <textarea
            name="content"
            placeholder="Content"
            value={blog.content}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg h-40"
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={blog.author}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="datetime-local"
            name="publishedAt"
            value={blog.publishedAt}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg"
          />

          <select
            name="category"
            value={blog.category}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg"
          >
            <option value="">Select Blog Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Image Upload & Preview */}
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && (
            <div>
              <img
                src={
                  imagePreview.startsWith("http")
                    ? imagePreview
                    : `${API_URL.replace("/api/blogs", "")}${imagePreview}`
                }
                alt="Blog Preview"
                width="100"
                className="rounded-lg shadow-md object-cover"
              />
              <button
                type="button"
                className="btn btn-danger mt-2"
                onClick={handleImageRemove}
              >
                Remove Image
              </button>
            </div>
          )}

          <button type="submit" className="btn btn-primary">
            Update Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
