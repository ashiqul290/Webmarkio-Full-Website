const { apiResponse } = require('../utils/apiResponse');
const Contact = require('../model/contact.model');

exports.contactController = async (req, res, next) => {
  try {
    const body = req.body && typeof req.body === "object" ? req.body : {};
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || !email || !message) {
      return apiResponse(res, 400, 'Please provide your name, email, and message.', null);
    }
    if (name.length > 100 || message.length > 5000) {
      return apiResponse(res, 400, "Name or message exceeds the allowed length.", null);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
      return apiResponse(res, 400, "Please provide a valid email address.", null);
    }
    const optionalFields = ["phone", "service", "budget"];
    if (optionalFields.some((field) => body[field] !== undefined && typeof body[field] !== "string")) {
      return apiResponse(res, 400, "Contact fields must be text values.", null);
    }

    const contactData = await Contact.create({
      name,
      email,
      phone: body.phone?.trim().slice(0, 40),
      service: body.service?.trim().slice(0, 120),
      budget: body.budget?.trim().slice(0, 120),
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
