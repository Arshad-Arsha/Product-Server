import userModel from "../schema/userSchema.js";
import bcrypt from "bcrypt";

// CREATE USER
export const userCreate = async (req, res) => {
  try {
    const { password, confirmPassword, email, username, contact, role } = req.body;

    // Validate required fields
    if (!password || !confirmPassword || !email || !username || !contact || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // Password match check
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match"
      });
    }

    // Check existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered"
      });
    }

    // Hash password (use 10 rounds)
    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      email,
      username,
      contact,
      role,
      password: encryptedPassword
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser
    });

  } catch (error) {
    console.log("USER CREATE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create User"
    });
  }
};
// GET ALL USERS
export const userGet = async (req, res) => {
  try {
    const users = await userModel.find().select("-password"); // Exclude password
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
};

// GET USER BY ID
export const userGetById = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to fetch user" });
  }
};

// UPDATE USER
export const userUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    await userModel.findByIdAndUpdate(id, req.body);
    res.status(200).json({ success: true, message: "User updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to update user" });
  }
};

// DELETE USER
export const userDelete = async (req, res) => {
  try {
    const id = req.params.id;
    await userModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to delete user" });
  }
};

