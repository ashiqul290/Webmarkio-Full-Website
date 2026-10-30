const express = require("express");
const { getBannerContent } = require("../../../controller/banner.controller");

const home = express.Router();
home.get("/banner", getBannerContent);

module.exports = home;
