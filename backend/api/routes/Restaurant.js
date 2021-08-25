const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const restaurantController = require('../controllers/Restaurant');

router.route('/')
    .get(catchAsync(restaurantController.getRestaurants))
    .post(catchAsync(restaurantController.createRestaurant));

router.get('/search', catchAsync(restaurantController.serachRestaurant))

router.route('/:id')
    .get(catchAsync(restaurantController.getRestaurantById))
    .put(catchAsync(restaurantController.addMenu))
    .delete(catchAsync(restaurantController.deleteRestaurantById));

module.exports = router;
