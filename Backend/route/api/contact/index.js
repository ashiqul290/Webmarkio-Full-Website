const express = require('express');
const { contactController, getContactsController } = require('../../../controller/contact.controller');
<<<<<<< HEAD
const { protect, adminOnly } = require('../../../middleware/auth.middleware');
=======
>>>>>>> origin/main

const contact = express.Router();

contact.post('/add-contact', contactController);
<<<<<<< HEAD
contact.get('/all-contact', protect, adminOnly, getContactsController);
=======
contact.get('/all-contact', getContactsController);
>>>>>>> origin/main

module.exports = contact;
