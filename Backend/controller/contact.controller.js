const { apiResponse } = require('../utils/apiResponse');
const Contact = require('../model/contact.model');

exports.contactController = async (req, res, next) => {
  try {
    const { name, email, phone, service, budget, message } = req.body || {};

    if (!name || !email || !message) {
      return apiResponse(res, 400, 'Please provide your name, email, and message.', null);
    }

    const contactData = await Contact.create({
      name,
      email,
      phone,
      service,
      budget,
      message,
    });

    return apiResponse(res, 200, 'Contact form submitted successfully.', {
      received: true,
      contactId: contactData._id,
      submittedAt: contactData.createdAt,
    });
  } catch (error) {
    next(error);
  }
};

exports.getContactsController = async (req, res, next) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });

    return apiResponse(res, 200, 'Contacts fetched successfully.', contacts);
  } catch (error) {
    next(error);
  }
};
