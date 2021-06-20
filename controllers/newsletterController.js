const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const request = require("request");

exports.sendNewsletter = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const { name } = req.user;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: name.split(" ")[0],
          LNAME: name.split(" ")[1],
        },
      },
    ],
  };

  const postData = JSON.stringify(data);

  options = {
    url: process.env.MAILCHIMP_URL,
    method: "POST",
    headers: {
      Authorization: "auth a75425796c2decaedd7381e86e891821-us6",
    },
    body: postData,
  };

  request(options, (err, response, body) => {
    if (err) {
      return new AppError(err, 400);
    } else {
      if (response.statusCode === 200) {
      } else {
        return new AppError(err, 400);
      }
    }
  });

  res.status(200).json({
    status: "success",
  });
});
