const express = require("express");
const newsletterController = require("../controllers/newsletterController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/", authController.protect, newsletterController.sendNewsletter);

module.exports = router;
