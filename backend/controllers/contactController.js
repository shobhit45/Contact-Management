const Contact = require('../models/Contact');

// Email validation function
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Create a new contact
exports.createContact = async (req, res) => {
    try {
        const { phones, email } = req.body;
        if (!phones || phones.length === 0) {
            return res.status(400).json({ message: 'At least one phone number is required' });
        }
        if (email && !isValidEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
        const existingContact = await Contact.findOne({ phones: { $in: phones } });
        if (existingContact) {
            return res.status(400).json({ message: 'Phone number already exists for another contact' });
        }
        const contact = await Contact.create(req.body);
        res.status(201).json(contact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all contacts
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a contact
exports.updateContact = async (req, res) => {
    const { id } = req.params;
    const { phones, email } = req.body;
    try {
        if (!phones || phones.length === 0) {
            return res.status(400).json({ message: 'At least one phone number is required' });
        }
        if (email && !isValidEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
        const existingContact = await Contact.findOne({ phones: { $in: phones }, _id: { $ne: id } });
        if (existingContact) {
            return res.status(400).json({ message: 'Phone number already exists for another contact' });
        }
        const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedContact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a contact
exports.deleteContact = async (req, res) => {
    const { id } = req.params;
    try {
        await Contact.findByIdAndDelete(id);
        res.json({ message: 'Contact deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};