const Product = require('../models/productModel');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      status: 'succes',
      results: products.length,
      data: { products },
      requestedAt: req.requestTime,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    //Product.findOne({_id:req.params.id});
    const product = await Product.findById(req.params.id);
    res.status(200).json({ status: 'succes', data: { product } });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    // const newProduct = new Product({});
    // newProdcut.save();

    const newProduct = await Product.create(req.body);

    res.status(201).json({
      status: 'success',
      data: { product: newProduct },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'invalid data sent !',
    });
  }
};

exports.updateProduct = async (req, res) => {
  // PATCH
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // true = return the new update document , false = return the original document
      runValidators: true,
    });
    res.status(200).json({
      status: 'succes',
      data: product,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  try {
    res.status(204).json({ status: 'succes', data: null });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
