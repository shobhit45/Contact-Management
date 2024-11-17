const express = require('express');
const { createContact, getAllContacts, updateContact, deleteContact } = require('../controllers/contactController');

const router = express.Router();

router.post('/contacts', createContact);
router.get('/contacts', getAllContacts);
router.put('/contacts/:id', updateContact);
router.delete('/contacts/:id', deleteContact);

module.exports = router;
