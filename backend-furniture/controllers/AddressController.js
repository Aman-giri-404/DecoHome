import AddressModel from "../models/AddressModel.js";

export const addAddress = async (req, res) => {
  try {
    const address = await AddressModel.create(req.body);

    res.status(201).json({
      message: "Address added successfully",
      address,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


export const getAddresses = async (req, res) => {
  try {
    const addresses = await AddressModel.find({
      user: req.params.userId,
    }).sort({
      isDefault: -1,
      createdAt: -1,
    });

    res.status(200).json({
      count: addresses.length,
      addresses,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};



export const getSingleAddress = async (req, res) => {
  try {
    const address = await AddressModel.findById(req.params.id);

    if (!address) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};



export const updateAddress = async (req, res) => {
  try {
    const address = await AddressModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Address updated",
      address,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};



export const deleteAddress = async (req, res) => {
  try {
    await AddressModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Address deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};




export const setDefaultAddress = async (req, res) => {
  try {
    const { userId } = req.body;

    await AddressModel.updateMany(
      {
        user: userId,
      },
      {
        isDefault: false,
      }
    );

    const address = await AddressModel.findByIdAndUpdate(
      req.params.id,
      {
        isDefault: true,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Default address updated",
      address,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};