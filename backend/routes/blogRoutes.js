const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  getAllBlogs,
  getBlogById,
  getBlogBySlug,
  createBlog,
  updateBlogById,
  updateBlogBySlug,
  deleteBlogById,
  deleteBlogBySlug,
  getRelatedBlogs,
} = require("../controllers/blogController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

// Routes for Blog Management
router.get("/", getAllBlogs);
router.get("/related", getRelatedBlogs);
router.get("/slug/:slug", getBlogBySlug);
router.get("/:id", getBlogById);

router.post("/", upload.single("image"), createBlog);

router.put("/:id", upload.single("image"), updateBlogById);
router.put("/slug/:slug", upload.single("image"), updateBlogBySlug);

router.delete("/:id", deleteBlogById);
router.delete("/slug/:slug", deleteBlogBySlug);

module.exports = router;
