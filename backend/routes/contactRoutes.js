const express = require("express");
const {
  createContact,
  getContacts,
  deleteContact,
} = require("../controllers/contactController");

const router = express.Router();

router.post("/contact", createContact);
router.get("/contact", getContacts);
router.delete("/contact/:id", deleteContact);

module.exports = router;
