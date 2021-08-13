import mongoose from 'mongoose';
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
    quantity: Number
});

module.exports = mongoose.models.FoodItem || mongoose.model('FoodItem', foodItemSchema);