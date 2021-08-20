import Restaurant from '../models/Restaurant'
import FoodGroup from '../models/FoodGroup'
import FoodItem from '../models/FoodItem'

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
    const menu = req.body.menu || null;

    console.log(req.body.menu);

    console.log({ menu });

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

    console.log({ restaurant });
    const restaurant_saved = await restaurant.save();
    res.status(201).send(restaurant_saved);
};

module.exports.getRestaurantById = async (req, res) => {
    const restaurantId = req.query.id;
    const restaurant = await Restaurant.findById(restaurantId).populate({
        path: 'menu',
        populate: { path: 'foodItems' }
    });
    res.status(200).send(restaurant);
};

module.exports.deleteRestaurantById = async (req, res) => {
    const restaurantId = req.query.id;
    const restaurant = await Restaurant.findByIdAndDelete(restaurantId);
    res.status(200).send(restaurant);
};

module.exports.serachRestaurant = async (req, res) => {
    const restaurants = await Restaurant.searchByQuery(req.body.query);
    res.status(200).send(restaurants)
}

module.exports.addMenu = async (req, res) => {
    const id = req.query.id;
    const restaurant = await Restaurant.findById(id);
    const menu = req.body.menu;
    if (!restaurant.menu) {
        restaurant.menu = []
    }

    for (let i = 0; i < menu.foodGroups.length; i++) {
        let group = menu.foodGroups[i];
        const foodGroup = new FoodGroup({ name: group.name });
        for (let i = 0; i < group.foodItems.length; i++) {
            let item = group.foodItems[i];
            const { name, description, cost, imageUrl, quantity } = item;
            const foodItem = new FoodItem({ name, description, cost, imageUrl, quantity });
            foodGroup.foodItems.push(foodItem);
            await foodItem.save();
        }
        restaurant.menu.push(foodGroup);
        await foodGroup.save();
    }

    await restaurant.save();
    res.send({ success: true, restaurant });
}
