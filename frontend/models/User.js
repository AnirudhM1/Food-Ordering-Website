import mongoose from 'mongoose';

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
    address: [String]
});

userSchema.statics.findOrCreate = async function (name, image, googleId, email) {
    const query = { name, image, googleId, email };
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

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
