import bcryptjs from "bcryptjs";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";

export const login = async(req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({
        email
    }) 

    if(!user) 
        throw Error("Your account does not exist. Please create your account")
    
    const checkPassword = await bcryptjs.compare(password, user.password);
    console.log(checkPassword)

    if(!checkPassword)
        throw Error("Invalid password. Try again!!!")

    generateTokenAndSetCookie(res, user._id);
    user.lastLogin = new Date();

    await user.save();

    res.status(200).json({
        success: true,
        message: "Login Successful",
        user: {
            ...user._doc,
            password: undefined
        }
    })
}

export const forgotPassword = async(req, res) => {
    const { email } = req.body;
    const clientUrl = process.env.CLIENT_URL;
    try {
        const user = await User.findOne({
            email
        });

        if(!user)
            return res.status(400).json({
                success: false,
                message: "The user does not exist. Create new account."    
            });

        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 60 * 60 * 1000

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save();

        await sendPasswordResetEmail(email, `${clientUrl}reset-password/${resetToken}`);

        res.status(200).json({
            success: true,
            message: "Password reset link has been sent successfully"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error
        })
    }
}

export const resetPassword = async (req, res) => {
    const {newPassword} = req.body;
    const {token} = req.params;

    try {
        const user = await User.findOne({
            resetPasswordToken: token
        });

        if(!user)
            return res.status(400).json({
                success: false,
                message: "The user does not exist. Create a new account."
            })
        const hashedPassword = await bcryptjs.hash(newPassword, 10);
        
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();

        await sendResetSuccessEmail(user.email);

        res.status(200).json({
            success: true,
            message: "Password has been successfully reset. Please login"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error
        })
    }
}

export const logout = (req, res) => {
    res.clearCookie("token")
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
            return res.status(400).json({
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
            verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
        })
        await user.save();

        generateTokenAndSetCookie(res, user._id)
        await sendVerificationEmail(user.email, verificationToken);
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

export const verifyMail = async (req, res) => {
    const {code} = req.body;
    
    try {
        if(!code) {
            return res.status(400).json({
                success: false,
                message: "Enter the code!!"
            });

        }

        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: new Date() }
        });

        if(!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired token"
            });

        }
        console.log("Verification token expires at: ", user.verificationTokenExpiresAt)
        console.log("Current: ", Date.now())
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;

        await user.save();
        await sendWelcomeEmail(user.email, user.name)
        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        })
    } catch(error) {
        console.error(error)
        res.status(400).json({
            success: false,
            error
        })
    }
}

export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");

        if(!user) return res.status(400).json({
            success: false,
            message: "User not found"
        })

        res.status(200).json({
            success: true,
            user
        })
    } catch(error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}