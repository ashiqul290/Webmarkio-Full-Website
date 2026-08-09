const express = require('express');
const { contactController } = require('../../../controller/contact.controller');

const contact = express.Router();

contact.post('/', contactController);

module.exports = contact;
