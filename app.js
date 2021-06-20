const express = require("express");
const morgan = require("morgan");
const request = require("request");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const compression = require("compression");
const path = require("path");
const cookieParser = require("cookie-parser");
const hpp = require("hpp");
const xss = require("xss-clean");
const estateRoute = require("./routes/estateRoute");
const usersRoute = require("./routes/usersRoute");
const bookingsRoute = require("./routes/bookingRoute");
const newsletterRoute = require("./routes/newsletterRoute");
const contactRoute = require("./routes/contactRoute");
const reviewsRoute = require("./routes/reviewsRoute");
const globalErrorHandler = require("./controllers/errorController");
const pug = require("pug");
const viewsRoute = require("./routes/viewsRoute");
const bodyParser = require("body-parser");
const blogRoute = require("./routes/blogRoute");
const AppError = require("./utils/appError");
const flash = require("connect-flash");
const session = require("express-session");

const app = express();

app.enable("trust proxy");

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(morgan("tiny"));

app.use(express.json());

app.use(express.static(path.join(__dirname, "/public")));

app.use(compression());

// app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP. please try again in an hour",
});

app.use("/api", limiter);

app.use(express.json({ limit: "10kb" }));

app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(mongoSanitize());

app.use(xss());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/", viewsRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/estate", estateRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/bookings", bookingsRoute);
app.use("/api/v1/newsletter", newsletterRoute);
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/reviews", reviewsRoute);

app.use(function (req, res, next) {
  res.status(404);

  // respond with html page
  if (req.accepts("html")) {
    res.render("404", { url: req.url });
    return;
  }

  // respond with json
  if (req.accepts("json")) {
    res.send({ error: "Not found" });
    return;
  }

  // default to plain-text. send()
  res.type("txt").send("Not found");
});

app.use(globalErrorHandler);

module.exports = app;
