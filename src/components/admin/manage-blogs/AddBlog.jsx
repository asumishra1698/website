import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import Sidebar from "../../../reuseable/Sidebar";
import { createBlog } from "../../../services/BlogService";
import { fetchBlogCategories } from "../../../services/BlogCategoryService";

const AddBlog = () => {
  const [blog, setBlog] = useState({
    title: "",
    slug: "",
    content: "",
    author: "",
    category: "",
    image: null,
    publishedAt: new Date().toISOString().slice(0, 16),
  });

  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

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
    }
  }, [navigate]);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBlog((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

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

      if (blog.image) {
        formData.append("image", blog.image);
      }

      await createBlog(formData);

      toast.success("Blog created successfully!");
      setBlog({
        title: "",
        slug: "",
        content: "",
        author: "",
        category: "",
        image: null,
        publishedAt: new Date().toISOString().slice(0, 16),
      });
      setImagePreview(null);
      navigate("/admin/manage-blogs");
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error(error.response?.data?.message || "Error creating blog post");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-6">Add New Blog</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md space-y-4"
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
          ></textarea>
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={blog.author}
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
          <input
            type="datetime-local"
            name="publishedAt"
            value={blog.publishedAt}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-3 border rounded-lg"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Blog Preview"
              className="w-32 h-32 object-cover mt-3 rounded-lg"
            />
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >
            Add Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
