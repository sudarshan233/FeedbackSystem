import bcryptjs from "bcryptjs";
import mongoose from "mongoose";

import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const login = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Login Successful"
    })
}
export const logout = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Logout Successful"
    })
}
export const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if(!name || !email || !password || !role)
            throw new Error("All fields are required!!");

        const userAlreadyExists = await User.findOne({ email });
        if(userAlreadyExists) {
            res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        })
        await user.save();

        generateTokenAndSetCookie(res, user._id)
        sendVerificationEmail(user.email, verificationToken);
        res.status(201).json({
            success: true,
            message: "User created successfully",
            createdUser: {
                ...user._doc,
                password: undefined
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}