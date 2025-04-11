const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorMiddleware");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const blogRoutes = require("./routes/blogRoutes");
const blogCategoryRoutes = require("./routes/blogCategoryRoutes");
const categoryRoutes = require("./routes/productCategoryRoutes");
const subCategoryRoutes = require("./routes/productSubCategoryRoutes");
const productRoutes = require("./routes/productRoutes");
const productBulkUploadRoutes = require("./routes/productBulkUploadRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const serviceCategoryRoutes = require("./routes/serviceCategoryRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve static files
app.use(bodyParser.json({ limit: "50mb" })); // Parse JSON with size limit
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true })); // Parse URL-encoded data
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", contactRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subCategoryRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/blog-categories", blogCategoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/products", productBulkUploadRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/service-categories", serviceCategoryRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
