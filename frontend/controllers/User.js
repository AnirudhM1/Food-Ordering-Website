import User from '../models/User'
import Address from '../models/Address'

module.exports.addAddress = async (req, res) => {
    const id = req.query.id;
    const { title, text } = req.body;
    const address = new Address({ title, text });
    const user = await User.findById(id);
    user.address.push(address);
    await address.save();
    await user.save();
    res.status(201).json({ success: true });
}

module.exports.updateAddress = async (req, res) => {
    const { title, text, addressId } = req.body;
    const addr = await Address.findById(addressId);
    addr.title = title;
    addr.text = text;
    const address = await addr.save();
    res.send(address);
}

module.exports.deleteAddress = async (req, res) => {
    const id = req.query.id;
    const addressId = req.body.addressId;
    console.log({ id, addressId })
    await User.findOneAndUpdate(id, { $pull: { address: addressId } });
    await Address.findByIdAndDelete(addressId);
    res.send({ success: true });
}

module.exports.updateImage = async (req, res) => {
    const id = req.query.id;
    const image = req.body.image;
    const user = await User.findById(id);
    user.image = image;
    await user.save();
    res.status(201).json({ success: true });
}

module.exports.updateName = async (req, res) => {
    const id = req.query.id;
    const name = req.body.name;
    const user = await User.findById(id);
    user.name = name;
    await user.save();
    res.status(201).json({ success: true });
}

module.exports.updateNameAndImage = async (req, res) => {
    const id = req.query.id;
    const { image, name } = req.body;
    const user = await User.findById(id);
    user.name = name;
    user.image = image;
    await user.save();
    res.status(201).json({ success: true });
}

module.exports.addHistory = async (req, res) => {
    const { address, restaurant, food } = req.body;
    res.status(201).json({ success: true });
}