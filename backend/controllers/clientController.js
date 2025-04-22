const Client = require("../models/Clients");

// Create a new client
exports.createClient = (req, res) => {
  const { clientName } = req.body;

  if (!clientName) {
    return res.status(400).json({ error: "Client name is required." });
  }

  let clientImage = "";
  if (req.file) {
    clientImage = req.file.filename; 
  }

  const newClient = new Client({
    clientName,
    clientImage,
  });

  newClient
    .save()
    .then((client) => {
      res.status(201).json(client); 
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to create client" });
    });
};

// Get all clients
exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.status(200).json(clients);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch clients", details: err.message });
  }
};

// Get single client by ID
exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }
    res.status(200).json(client);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch client", details: err.message });
  }
};

// Update client
exports.updateClient = async (req, res) => {
  try {
    const { clientName } = req.body;
    let clientImage = req.body.clientImage;

    if (req.file) {
      clientImage = req.file.filename; 
    }

    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      { clientName, clientImage },
      { new: true, runValidators: true }
    );

    if (!updatedClient) {
      return res.status(404).json({ error: "Client not found" });
    }
    
    res.status(200).json(updatedClient);
  } catch (err) {
    res.status(500).json({
      error: "Failed to update client",
      details: err.message,
    });
  }
};


// Delete client
exports.deleteClient = async (req, res) => {
  try {
    const deletedClient = await Client.findByIdAndDelete(req.params.id);
    if (!deletedClient) {
      return res.status(404).json({ error: "Client not found" });
    }
    res.status(200).json({ message: "Client deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to delete client", details: err.message });
  }
};
