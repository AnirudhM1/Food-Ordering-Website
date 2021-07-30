const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const restaurantController = require('../controllers/Restaurant');

router
    .route('/')
    .get(catchAsync(restaurantController.getRestaurants))
    .post(catchAsync(restaurantController.createRestaurant));

router
    .route('/:id')
    .get(catchAsync(restaurantController.getRestaurantById))
    .delete(catchAsync(restaurantController.deleteRestaurantById));

module.exports = router;
