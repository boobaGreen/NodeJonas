const express = require('express');

const tourController = require('../controllers/tourController');

const router = express.Router();

// router.param('id', productController.checkID);

router
  .route('/')
  .get(tourController.getAllProducts)
  .post(tourController.createProduct);

router
  .route('/:id')
  .get(tourController.getProduct)
  .patch(tourController.updateProduct)
  .delete(tourController.deleteProduct);

module.exports = router;
