const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    googleId: Number,
    contact: Number,
    address: [String]
});

userSchema.statics.findOrCreate = async function (query) {
    try {
        let data = await this.findOne(query);
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

module.exports = mongoose.model('User', userSchema);
