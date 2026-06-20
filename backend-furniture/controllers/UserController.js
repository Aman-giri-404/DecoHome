import UserModel from "../models/UserModel.js";

//
// REGISTER USER
//
export const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      avatar,
      role,
    } = req.body;

    const existingUser = await UserModel.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered.",
      });
    }

    const user = await UserModel.create({
      name,
      email,
      password,
      phone,
      avatar,
      role,
    });

    res.status(201).json({
      message: "User registered successfully.",

      user,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


//
// LOGIN USER
//
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({
      email,
      password,
      role: "user",
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    if (user.isBlocked) {
      return res.status(403).json({
        message: "Your account has been blocked.",
      });
    }

    user.lastLogin = new Date();

    await user.save();

    res.status(200).json({
      message: "Login successful.",

      user,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


//
// LOGIN ADMIN
//
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await UserModel.findOne({
      email,
      password,
      role: "admin",
    });

    if (!admin) {
      return res.status(401).json({
        message: "Invalid admin credentials.",
      });
    }

    if (admin.isBlocked) {
      return res.status(403).json({
        message: "Admin account is blocked.",
      });
    }

    admin.lastLogin = new Date();

    await admin.save();

    res.status(200).json({
      message: "Admin login successful.",

      user: admin,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


//
// GET USERS
//
export const getUsers = async (req, res) => {
  try {
    const role = req.query.role;

    let filter = {};

    if (role) {
      filter.role = role;
    }

    const users = await UserModel.find(filter)
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      count: users.length,

      users,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//
// GET SINGLE USER
//
export const getSingleUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


//
// UPDATE USER
//
export const updateUser = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      avatar,
    } = req.body;

    const user = await UserModel.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.avatar = avatar || user.avatar;

    await user.save();

    res.status(200).json({
      message: "User updated successfully.",
      user,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};



//
// BLOCK USER
//
export const blockUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    res.status(200).json({
      message: "User blocked successfully.",
      user,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


//
// UNBLOCK USER
//
export const unblockUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    res.status(200).json({
      message: "User unblocked successfully.",
      user,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};



//
// DELETE USER
//
export const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    res.status(200).json({
      message: "User deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};