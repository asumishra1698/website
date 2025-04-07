const express = require("express");
const { createContact, getContacts, deleteContact } = require("../controllers/contactController");

const router = express.Router();

// Route to create a new contact
router.post("/contact", createContact);

// Route to fetch all contacts
router.get("/contact", getContacts);

// Route to delete a contact by ID
router.delete("/contact/:id", deleteContact);

module.exports = router;