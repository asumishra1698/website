const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");

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

const errorHandler = require("./middlewares/errorMiddleware");

const path = require("path");

dotenv.config();
connectDB();

const app = express();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(cors());

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

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
