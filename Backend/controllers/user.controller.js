import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import validator from "validator";
import bcrypt from 'bcrypt'




// 🔹 REGISTER USER
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        console.log(process.env.JWT_SECRET);
        

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already in use" });
        }

        if(!validator.isEmail(email)){
            return res.status(400).json({ success: false, message: "Please enter valid email" });
        }

        if(password.length < 8 ){
            return res.status(400).json({ success: false, message: "Please enter a strong password" });
        }

        //hashed password
        const hashedPassword = await userModel.hashPassword(password)

        // Create new user
        const newUser = new userModel({ name, email, password : hashedPassword });

        const user = await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user
        });

    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// 🔹 LOGIN USER
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        
        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        
        

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        // console.log(isMatch);
        
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.json({
            success: true,
            message: "Login successful",
            token,
            user
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export { registerUser, loginUser };
