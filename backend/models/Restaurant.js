const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    },
    // Contact numbers of the restaurant. code includes the dialing code. eg +91, 022 etc
    contacts: [{code: String, number: Number}],
    // Type of food the restaurant serves. eg chinese, pizza etc.
    type: [String],
    rating: {
        type: Number,
        requred: true
    },
    // Estimated cost (per person) of the restaurant
    cost: {
        type: Number,
        required: true
    },
    menu: {
        type: [{type: Schema.Types.ObjectId, ref: 'FoodGroup'}],
        required: true
    }
    // TODO Create offers field which stores all the available offers/discounts offered by the restaurant
})

module.exports = mongoose.model('Restaurant', restaurantSchema);