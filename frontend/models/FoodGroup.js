import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const foodGroupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    foodItems: [{ type: Schema.Types.ObjectId, ref: 'FoodItem' }]
});

module.exports = mongoose.models.FoodGroup || mongoose.model('FoodGroup', foodGroupSchema);