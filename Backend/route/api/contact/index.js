const express = require('express');
const { contactController, getContactsController } = require('../../../controller/contact.controller');
const { protect, adminOnly } = require('../../../middleware/auth.middleware');

const contact = express.Router();

contact.post('/add-contact', contactController);
contact.get('/all-contact', protect, adminOnly, getContactsController);

module.exports = contact;
