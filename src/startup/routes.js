const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const mongoSanitize = require("express-mongo-sanitize");

const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

require("colors");

//routes
const tours = require("../routes/tours");
const users = require("../routes/users");

module.exports = function (app) {
  app.use(helmet());
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  //sanitize
  app.use(mongoSanitize());

  //prevent xss
  app.use(xss());

  //hpp
  app.use(hpp());

  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

  //mount routers
  app.use("/api/v1/tours", tours);
  app.use("/api/v1/users", users);
};
