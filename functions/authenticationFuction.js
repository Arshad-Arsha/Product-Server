import userModel from "../schema/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userVerify = await userModel.findOne({ email });
    if (!userVerify) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const verifyPassword = await bcrypt.compare(
      password,
      userVerify.password
    );
    if (!verifyPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });
    }

    const token = jwt.sign(
      { userId: userVerify._id, userRole: userVerify.role },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        success: true,
        token,
        userId: userVerify._id,      // ✅ Added
        role: userVerify.role,      // ✅ Added
        message: "User logged in successfully",
      });

  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Login failed" });
  }
};
// export const userLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const userVerify = await userModel.findOne({ email });
//     if (!userVerify) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }

//     const verifyPassword = await bcrypt.compare(password, userVerify.password);
//     if (!verifyPassword) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Incorrect password" });
//     }

//     const token = jwt.sign(
//       { userId: userVerify._id, userRole: userVerify.role },
//       process.env.SECRET_KEY,
//       { expiresIn: "1d" }
//     );

//     // Send token in cookie AND JSON response
//     return res
//       .cookie("token", token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         maxAge: 24 * 60 * 60 * 1000,
//       })
//       .status(200)
//       .json({
//         success: true,
//         token,
//         message: "User logged in successfully",
//       });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Login failed" });
//   }
// };
// LOGOUT USER
export const userLogout = (req, res) => {
  try {
    res
      .clearCookie("token")
      .status(200)
      .json({ success: true, message: "Logout successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Logout failed" });
  }
};

