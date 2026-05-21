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

// Login user
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

// Login admin
export const loginadmin = async (req, res) => {
  try {
    const roleadmin = req.query.role || "admin";
    const { email, password, role } = req.body;
    const user = await UserModel.findOne({ email, password, role: roleadmin });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user and admin
export const userget = async (req, res) => {
  try {
    const roleParam = req.query.role || "user";
    const users = await UserModel.find({ role: roleParam });
    res.status(200).json({
      message: `Successfully fetched lists for role: ${roleParam}`,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
