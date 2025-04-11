const express = require("express");
const { getDashboardStats } = require("../controllers/dashboardController");

const router = express.Router();

// Route to fetch dashboard stats
router.get("/stats", getDashboardStats);

module.exports = router;