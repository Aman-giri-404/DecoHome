import UserModel from "../models/UserModel.js";

// Register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await UserModel.create({ name, email, password, role });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login
export const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};