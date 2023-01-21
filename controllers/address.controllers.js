const Address = require("../models/address.models");

const getAddress = async (req, res) => {
    const id = req.params.addressId;

    try {
        const address = await Address.findById(id);
        return res.status(200).json(address);
    } catch (err) {
        return res.status(500).json(err);
    }
};
const getAddresses = async (req, res) => {
    try {
        const addresses = await Address.find();
        return res.status(200).json(addresses);
    } catch (err) {
        return res.status(500).json(err);
    }
};
const deleteMyAddress = async (req, res) => {
    const id = req.verifiedUser.addressId;

    try {
        const deletedAddress = await Address.findByIdAndDelete(id);
        return res.status(200).json(deletedAddress);
    } catch (err) {
        return res.status(500).json(err);
    }
};
const updateMyAddress = async (req, res) => {
    const id = req.verifiedUser.addressId;

    try {
        const updatedAddress = await Address.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        return res.status(200).json(updatedAddress);
    } catch (err) {
        return res.status(500).json(err);
    }
};
const getMyAddress = async (req, res) => {
    const addressId = req.verifiedUser.address;

    try {
        const address = await Address.findById(addressId);
        return res.status(200).json(address);
    } catch (err) {
        return res.status(500).json(err);
    }
};
module.exports.updateMyAddress = updateMyAddress;
module.exports.getAddress = getAddress;
module.exports.getAddresses = getAddresses;
module.exports.deleteMyAddress = deleteMyAddress;
module.exports.getMyAddress = getMyAddress;