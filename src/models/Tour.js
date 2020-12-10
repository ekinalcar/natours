const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const TourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    trim: true,
    unique: true,
  },
  durations: {
    type: Number,
    required: [true, "Please add a duration"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "Please add a max group size"],
  },
  difficulty: {
    type: String,
    required: [true, "Please add a difficulty"],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "Please add a price"],
  },
  priceDiscount: {
    type: Number,
  },
  summary: {
    type: String,
    trim: true,
    required: [true, "Please add a summary"],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "Please add a cover image"],
  },
});

const validateTour = (tour) => {
  const schema = Joi.object({
    name: Joi.string().trim().required(),
    durations: Joi.number().required(),
    maxGroupSize: Joi.number().required(),
    difficulty: Joi.string().trim().required(),
    price: Joi.number().required(),
  });
  return schema.validate(tour);
};

const validateUpdate = (tour) => {
  const schema = Joi.object({
    name: Joi.string().trim(),
    durations: Joi.number(),
    maxGroupSize: Joi.number(),
    difficulty: Joi.string().trim(),
    price: Joi.number(),
  });
  return schema.validate(tour);
};

exports.Tour = mongoose.model("Tours", TourSchema);
exports.validate = validateTour;
exports.validateUpdate = validateUpdate;
