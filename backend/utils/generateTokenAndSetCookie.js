import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
    res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: "lax",
    });
    return token;
}
