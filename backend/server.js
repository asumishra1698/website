const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const blogCategoryRoutes = require("./routes/blogCategoryRoutes");
const categoryRoutes = require("./routes/productCategoryRoutes");
const subCategoryRoutes = require("./routes/productSubCategoryRoutes");


const productRoutes = require("./routes/productRoutes");
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

app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subCategoryRoutes);

app.use("/api/blogs", blogRoutes);
app.use("/api/blog-categories", blogCategoryRoutes);

app.use("/api/products", productRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
