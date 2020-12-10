const { Tour, validate, validateUpdate } = require("../models/Tour");

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    return res
      .status(200)
      .json({ success: true, results: tours.length, data: tours });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};

exports.getTour = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findById(id);
    return res.status(200).json({ success: true, data: tour });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};

exports.createTour = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res
        .status(400)
        .send({ success: false, error: error.details[0].message });

    const { name, price, rating } = req.body;

    const tour = await Tour.create({ name, price, rating });

    return res.status(201).json({ success: true, data: tour });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const { error } = validateUpdate(req.body);
    if (error)
      return res
        .status(400)
        .send({ success: false, error: error.details[0].message });

    const { id } = req.params;
    const tour = await Tour.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    return res.status(200).json({ success: true, data: tour });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const { id } = req.params;
    await Tour.findByIdAndDelete(id);
    return res.status(204).json({ success: true, data: null });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};
