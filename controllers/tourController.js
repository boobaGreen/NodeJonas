const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    const queryObj = { ...req.query }; // new hard copy
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    const tours = await Tour.find(queryObj);

    // const tours = await Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');

    res.status(200).json({
      status: 'succes',
      results: tours.length,
      data: { tours },
      requestedAt: req.requestTime,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    //Product.findOne({_id:req.params.id});
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({ status: 'succes', data: { tour } });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    // const newProduct = new Product({});
    // newProdcut.save();

    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: { tour: newTour },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'invalid data sent !',
    });
  }
};

exports.updateTour = async (req, res) => {
  // PATCH
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // true = return the new update document , false = return the original document
      runValidators: true,
    });
    res.status(200).json({
      status: 'succes',
      data: tour,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  await Tour.findByIdAndDelete(req.params.id);
  try {
    res.status(204).json({ status: 'succes', data: null });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
