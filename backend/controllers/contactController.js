import Contact from "../models/Contacts.js"; // Use import for ES modules

// ✅ Fetch all contact submissions
const fetchAllContacts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || "Failed to fetch contacts.";
    console.error("Error fetching contacts:", error);
    toast.error(errorMessage);
    throw error;
  }
};

// Create a new contact
export const createContact = async (req, res) => {
  try {
    const { phone, message } = req.body;

    if (phone && phone.length > 12) {
      return res
        .status(400)
        .json({ error: "Phone number cannot exceed 12 digits" });
    }

    if (message && message.split(" ").length > 15) {
      return res.status(400).json({ error: "Message cannot exceed 25 words" });
    }

    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ message: "Contact created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create contact" });
  }
};

// Get all contacts
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
};

// Delete a contact by ID
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    await Contact.findByIdAndDelete(id);
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete contact" });
  }
};
