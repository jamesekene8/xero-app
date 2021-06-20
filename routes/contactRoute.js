const express = require("express");
const newsletterController = require("../controllers/newsletterController");
const authController = require("../controllers/authController");
const contactController = require("../controllers/contactController");

const router = express.Router();

router.post("/", authController.protect, contactController.contactUs);

module.exports = router;
