const catchAsync = require("../utils/catchAsync");
const Realestate = require("../models/realestateModel");
const Booking = require("../models/bookingModel");
const stripe = require("stripe")(
  "sk_test_51IziLWJQxirzeJ4nBFMUg9X4Qgo52iIloysUqwFJoN5XhFD5Ni8Ix6Txc7pbS3xNMWcmYOUCejtwb2y3Y4ybbQ9a00muBwls43"
);

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const estate = await Realestate.findById(req.params.estateId);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${req.protocol}://${req.get("host")}/estates/?estate=${
      req.params.estateId
    }&user=${req.user.id}&price=${estate.price}`,
    cancel_url: `${req.protocol}://${req.get("host")}/estate/${estate.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.estateId,
    line_items: [
      {
        name: `${estate.title}`,
        description: estate.description,
        amount: estate.price * 100,
        currency: "usd",
        quantity: 1,
      },
    ],
  });
  res.status(200).json({
    status: "success",
    session,
  });
});

exports.createBookingCheckout = catchAsync(async (req, res, next) => {
  const { estate, user, price } = req.query;
  if (!estate && !user && !price) return next();

  await Booking.create({ estate, user, price });
  res.redirect(req.originalUrl.split("?")[0]);
});
