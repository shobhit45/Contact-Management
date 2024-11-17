const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    phones: [{ type: String, required: true }],
    company: String,
    jobTitle: String
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);