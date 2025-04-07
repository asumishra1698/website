const express = require("express");
const {
  register,
  login,
  forgotPassword,
  verifyOTP,
  resetPassword,
  getUsers, 
  deleteUser,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);

router.get("/users", getUsers);
router.delete("/users/:id", deleteUser);

module.exports = router;
