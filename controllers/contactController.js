const catchAsync = require("../utils/catchAsync");
const nodemailer = require("nodemailer");
const mg = require("nodemailer-mailgun-transport");
const fs = require("fs");
const path = require("path");

exports.contactUs = catchAsync(async (req, res, next) => {
  const { name, email, phone, subject, message } = req.body;

  const mailgunAuth = {
    auth: {
      api_key: process.env.MAILGUN_API,
      domain: process.env.MAILGUN_DOMAIN,
    },
  };

  const smtpTransport = nodemailer.createTransport(mg(mailgunAuth));

  const mailOptions = {
    from: email,
    to: process.env.MAILGUN_MAIL,
    subject: subject,
    text: message,
  };

  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      return new AppError(error, 400);
    } else {
    }
  });

  res.status(200).json({
    status: "success",
  });
});
