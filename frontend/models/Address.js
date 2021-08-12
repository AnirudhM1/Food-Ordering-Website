import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
});

module.exports = mongoose.models.Address || mongoose.model('Address', addressSchema);