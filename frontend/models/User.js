import mongoose from 'mongoose';
import Address from './Address'

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: String,
    googleId: Number,
    contact: Number,
    email: String,
    address: [{ type: Schema.Types.ObjectId, ref: 'Address' }],
    history: [{
        address: String,
        restaurant: String,
        food: [{ item: { type: Schema.Types.ObjectId, ref: 'FoodItem' }, count: Number }],
        total: Number
    }]
});

userSchema.statics.findOrCreate = async function (name, image, googleId, email) {
    const query = { name, image, googleId, email };
    const search = { googleId };
    try {
        let data = await this.findOne(search);
        if (data) {
            return data;
        } else {
            data = new this(query);
            data = await data.save();
            return data;
        }
    } catch (e) {
        console.error(e);
    }
};

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
