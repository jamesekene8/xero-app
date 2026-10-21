# Xero: Apartment Rentals in Nigeria

A server-rendered Node.js web app for finding and booking short-let apartments in Lagos, Abuja and Ibadan. Users can search listings, read and leave reviews, and pay for a booking through **Stripe Checkout**. The app also has a blog, a newsletter sign-up and a contact form.

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![Pug](https://img.shields.io/badge/Pug-A86454?logo=pug&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-635BFF?logo=stripe&logoColor=white)

<!-- TODO: add screenshots, e.g. docs/screenshots/home.png, listing.png, checkout.png -->

## Features

- **Listings:** apartments with price, guests, bedrooms and amenities (Wi-Fi, pool, parking, security, gym and more), with search by city
- **Bookings and payments:** Stripe Checkout sessions created on the server, then a booking is recorded
- **Accounts:** sign-up and login with JWTs in HTTP-only cookies, bcrypt password hashing, and an emailed password-reset token
- **Agents directory** and a **submit-a-property** page
- **Reviews** on listings, and a **blog** with image upload (Multer + Sharp resizing)
- **Email:** Nodemailer (SMTP in development, Mailgun in production), plus a Mailchimp newsletter
- **Hardening:** rate limiting on `/api`, NoSQL-injection sanitising, XSS cleaning, HTTP parameter pollution protection, compression

## Architecture

MVC with a REST API and server-rendered views side by side:

```
server.js            Connects to MongoDB, starts the server
app.js               Express app, security middleware, route mounting
routes/              /api/v1/{estate, users, bookings, reviews, blog, newsletter, contact} + view routes
controllers/         Route handlers (auth, booking/Stripe, estates, reviews, blog, email)
models/              Mongoose schemas: Realestate, User, Booking, Review, Blog
views/               Pug templates
utils/               AppError, catchAsync, APIFeatures (filter/sort/paginate), email
dev-data/            Sample listings for Lagos, Abuja and Ibadan + import script
public/assets/js/    Client-side JS bundled with Parcel
```

## Running locally

**Prerequisites:** Node.js 14–16 (the dependency versions date from 2021), a MongoDB database (Atlas free tier or local), and a Stripe test account.

```bash
npm install
cp config.env.example config.env     # then fill in your own values
node dev-data/import-dev-data.js --import   # load sample listings
npm run dev                           # http://localhost:4000
```

To rebuild the front-end bundle after changing `public/assets/js`, run `npm run build:js`.

## Status and next steps

This was built in 2021 as a learning project. The structure (AppError, catchAsync, APIFeatures) follows patterns from a Node.js course I took, which I then applied to my own rental-marketplace idea.

- [ ] Re-enable `helmet` with a proper Content Security Policy
- [ ] Add a Stripe webhook so bookings are only created after a confirmed payment
- [ ] Upgrade dependencies (Mongoose 5 → 8, Parcel 1 → 2)
- [ ] Add tests

## Author

**James Uguna**: [GitHub](https://github.com/jamesekene8)
