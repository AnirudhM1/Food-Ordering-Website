const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    
    cost: {
        type: Number,
        required: true
    },
    imageUrl: String,
    quantity: String
});

module.exports = mongoose.model('FoodItem', foodItemSchema);