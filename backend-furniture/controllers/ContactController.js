import ContactModel from "../models/ContactModel.js";

//
// Submit Contact Form
//
export const submitContact = async (req, res) => {
  try {
    const contact = await ContactModel.create(req.body);

    res.status(201).json({
      message: "Message submitted successfully",
      contact,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//
// Get All Messages
//
export const getContacts = async (req, res) => {
  try {
    const contacts = await ContactModel.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      count: contacts.length,
      contacts,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//
// Get Single Message
//
export const getContact = async (req, res) => {
  try {
    const contact = await ContactModel.findById(
      req.params.id
    );

    if (!contact) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//
// Update Status
//
export const updateContactStatus = async (req, res) => {
  try {
    const contact = await ContactModel.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    );

    if (!contact) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    res.status(200).json({
      message: "Status updated successfully",
      contact,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//
// Delete Message
//
export const deleteContact = async (req, res) => {
  try {
    const contact = await ContactModel.findByIdAndDelete(
      req.params.id
    );

    if (!contact) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    res.status(200).json({
      message: "Message deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};