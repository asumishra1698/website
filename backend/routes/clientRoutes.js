const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");
const upload = require("../middlewares/uploadMiddleware");

// Create a new client
router.post("/", upload.single("clientImage"), clientController.createClient);

// Get all clients
router.get("/", clientController.getAllClients);

// Get a single client by ID
router.get("/:id", clientController.getClientById);

// Update a client by ID
router.put("/:id", upload.single("clientImage"), clientController.updateClient);

// Delete a client by ID
router.delete("/:id", clientController.deleteClient);

module.exports = router;
