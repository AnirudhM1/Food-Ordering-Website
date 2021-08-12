import mongoose from 'mongoose';
import mongoose_fuzzy_searching from 'mongoose-fuzzy-searching';
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: String,
    location: {
        type: {
            address: {
                type: String,
                required: true
            },
            lattitude: {
                type: Number,
                required: true
            },
            longitude: {
                type: Number,
                required: true
            }
        },
        required: true
    },
    // Contact numbers of the restaurant. code includes the dialing code. eg +91, 022 etc
    contacts: [{ code: String, number: Number }],
    // Type of food the restaurant serves. eg chinese, pizza etc.
    type: String,
    rating: {
        type: Number,
        requred: true
    },
    // Estimated cost (per person) of the restaurant
    cost: {
        type: Number,
        required: true
    },
    menu: [{ type: Schema.Types.ObjectId, ref: 'FoodGroup' }]
    // TODO Create offers field which stores all the available offers/discounts offered by the restaurant
});

restaurantSchema.plugin(mongoose_fuzzy_searching, { fields: ['name', 'type'] });

restaurantSchema.statics.searchByQuery = async function (query) {
    const results = await this.fuzzySearch(query).catch(e => console.error(e))
    return results;
    /* const results = await this.find({
        $text: { $search: `${query}` }
    }).sort({ score: { $meta: "textScore" } }).catch(e => console.error(e)) */
}
module.exports = mongoose.models.Restaurant || mongoose.model('Restaurant', restaurantSchema);
