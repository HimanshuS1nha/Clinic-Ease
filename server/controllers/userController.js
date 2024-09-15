import User from "../models/userModel.js";
import Doctor from "../models/doctorModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  const { email, mobile, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      mobile,
      password: hashedPassword,
    });
    await newUser.save();
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_TOKEN,
      { expiresIn: "1h" }
    );

    res.cookie("authorization", token, {
      path: "/",
      expires: new Date(Date.now() + 7 * 86400000),
      secure: true,
      httpOnly: true,
      sameSite: "None",
    });

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_TOKEN,
      { expiresIn: "1h" }
    );
    res.cookie("authorization", token, {
      path: "/",
      expires: new Date(Date.now() + 7 * 86400000),
      secure: true,
      httpOnly: true,
      sameSite: "None",
    });

    const { password: _, ...restUser } = user;

    res.json({ message: "Login successful", user: restUser });
  } catch (error) {
    res.status(400).json({ message: "Error logging in", error });
  }
};

export const getUser = async (req, res) => {
  const { id, email, mobile } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ _id: id }, { email }, { mobile }],
    }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: "Error fetching user details", error });
  }
};

export const isUserLoggedIn = async (req, res) => {
  try {
    const token = req.cookies["authorization"];
    if (!token) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const { id, role } = jwt.verify(token, process.env.JWT_TOKEN);
    if (!id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (role === "doctor") {
      const doctor = await Doctor.findOne({ _id: id });
      if (!doctor) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { password: _, ...restDoctor } = doctor;

      return res.status(200).json({ user: restDoctor, role: "doctor" });
    } else {
      const user = await User.findOne({ _id: id });
      if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { password, ...restUser } = user;

      return res.status(200).json({ user: restUser });
    }
  } catch (error) {
    res.status(500).json({ message: "Some error occured." });
  }
};

export const createAdmin = async (req, res) => {
  const { name, email, mobile, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new User({
      name,
      email,
      mobile,
      password: hashedPassword,
      role: "admin",
    });

    await newAdmin.save();

    res
      .status(201)
      .json({ message: "Admin created successfully", admin: newAdmin });
  } catch (error) {
    res.status(400).json({ message: "Error creating admin", error });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie("authorization", "", {
      path: "/",
      maxAge: 0,
      secure: true,
      httpOnly: true,
      sameSite: "None",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error loggin out" });
  }
};
