const express = require("express");
const { getBannerContent } = require("../../../controller/banner.controller");
const { getTestimonials } = require("../../../controller/testimonials.controller");

const home = express.Router();
home.get("/banner", getBannerContent);
home.get("/testimonials", getTestimonials);

module.exports = home;
