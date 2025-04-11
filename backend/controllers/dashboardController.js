const User = require("../models/User");
// const Page = require("../models/Page");
const Blog = require("../models/Blog");
const Product = require("../models/Product");
const Testimonial = require("../models/Testimonial");
const Service = require("../models/ServiceModel");
const BlogCategory = require("../models/BlogCategory");
const ProductCategory = require("../models/ProductCategory");
const Contact = require("../models/Contacts");

// Dashboard Stats Controller
exports.getDashboardStats = async (req, res) => {
  try {
    // Fetch counts for each entity
    const totalUsers = await User.countDocuments();
    // const totalPages = await Page.countDocuments();
    const totalBlogs = await Blog.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalTestimonials = await Testimonial.countDocuments();
    const totalServices = await Service.countDocuments();
    const totalBlogCategories = await BlogCategory.countDocuments();
    const totalProductCategories = await ProductCategory.countDocuments();
    const totalContacts = await Contact.countDocuments();

    // Return the aggregated stats
    res.status(200).json({
      totalUsers,
    //   totalPages,
      totalBlogs,
      totalProducts,
      totalTestimonials,
      totalServices,
      totalBlogCategories,
      totalProductCategories,
      totalContacts,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
};
