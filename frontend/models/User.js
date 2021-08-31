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
    console.log('Reached model find/create')
    const query = { name, image, googleId, email };
    const search = { googleId };
    console.log('Data recieved:', { query, search });
    try {
        console.log('Enter try block')
        let data = await this.findOne(search, (err, data) => { console.log({ err, data }) });
        console.log('Data found:', data);
        if (data) {
            console.log('Reached if true')
            return data;
        } else {
            console.log('Reached else')
            data = new this(query);
            console.log('New data:', data)
            data = await data.save();
            console.log('saved data:', data)
            return data;
        }
    } catch (e) {
        console.log('Reached error')
        console.error(e);
    }
};

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
