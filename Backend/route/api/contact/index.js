const express = require('express');
const { contactController, getContactsController } = require('../../../controller/contact.controller');

const contact = express.Router();

contact.post('/add-contact', contactController);
contact.get('/all-contact', getContactsController);

module.exports = contact;
