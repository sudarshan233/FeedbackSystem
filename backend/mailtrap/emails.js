import dotenv from 'dotenv';
dotenv.config();

import { PASSWORD_RESET_REQUEST_TEMPLATE, 
    PASSWORD_RESET_SUCCESS_TEMPLATE, 
    VERIFICATION_EMAIL_TEMPLATE, 
    WELCOME_EMAIL_TEMPLATE
} from './emailTemplates.js';
import { mailerClient } from './email.config.js';

export const sendVerificationEmail = async(email, verificationToken) => {
    try {
        const response = await mailerClient.sendMail({
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: "Verify your mail",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationToken}", verificationToken)
        })
        console.log("Account Verification Email sent succesfully", response)
    } catch(error) {
        console.error(error)
    }
}

export const sendWelcomeEmail = async(email) => {
    
    try {
        const response = await mailerClient.sendMail({
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: "Finally, you have arrived!!",
            html: WELCOME_EMAIL_TEMPLATE
        })
        console.log("Welcome Email sent succesfully", response)
    } catch(error) {
        console.error(error)
    }
}

export const sendPasswordResetEmail = async (email, resetURL) => {

    try {
        const response = await mailerClient.sendMail({
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
        })

        console.log("Password Reset Request Email sent successfully", response)
    } catch(error) {
        console.error(error)
    }
}

export const sendResetSuccessEmail = async (email) => {
    try {
        const response = await mailerClient.sendMail({
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: "Reset your password",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
        })

        console.log("Password Reset Success Email sent successfully", response)
    } catch(error) {
        console.error(error)
    }
}