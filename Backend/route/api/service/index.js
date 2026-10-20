const express = require('express');
const {
  AddServiceController,
  getAllServices,
  getServiceBySlug,
  updateService,
  deleteService,
} = require('../../../controller/service.controller');
const { protect, adminOnly } = require('../../../middleware/auth.middleware');
const service = express.Router();

service.post('/add-service', protect, adminOnly, AddServiceController);
service.get('/all-services', getAllServices);
service.get('/single-service/:slug', getServiceBySlug);
service.patch('/update-service/:id', protect, adminOnly, updateService);
service.delete('/delete-service/:id', protect, adminOnly, deleteService);

module.exports = service;
