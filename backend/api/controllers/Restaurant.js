const Restaurant = require('../models/Restaurant');

module.exports.getRestaurants = async (req, res) => {
    const restaurants = await Restaurant.find({});
    res.status(200).send(restaurants);
};

module.exports.createRestaurant = async (req, res) => {
    const {
        name,
        // imageUrl,
        address,
        latitude,
        longitude,
        // contacts,
        // type,
        cost,
        rating
        // menu
    } = req.body;

    const location = { address, latitude, longitude };
    const imageUrl = req.body.imageUrl || null;
    const contacts = req.body.contacts || null;
    const type = req.body.type || null;
    const menu = req.body.type || null;

    const restaurant = new Restaurant({
        name,
        imageUrl,
        location,
        contacts,
        type,
        cost,
        rating,
        menu
    });
    restaurant_saved = await restaurant.save();
    res.status(201).send(restaurant_saved);
};

module.exports.getRestaurantById = async (req, res) => {
    const restaurantId = req.params.id;
    const restaurant = await Restaurant.findById(restaurantId);
    res.status(200).send(restaurant);
};

module.exports.deleteRestaurantById = async (req, res) => {
    const restaurantId = req.params.id;
    const restaurant = await Restaurant.findByIdAndDelete(restaurantId);
    res.status(200).send(restaurant);
};
