import dotenv from 'dotenv';
dotenv.config();

import { PASSWORD_RESET_REQUEST_TEMPLATE, 
    PASSWORD_RESET_SUCCESS_TEMPLATE, 
    VERIFICATION_EMAIL_TEMPLATE 
} from './emailTemplates.js';
import { mailtrapClient, sender } from './mailtrap.config.js'

export const sendVerificationEmail = async(email, verificationToken) => {
    const recipient = [{
        email
    }];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        })
        console.log("Account Verification Email sent succesfully", response)
    } catch(error) {
        console.error(error)
    }
}

export const sendWelcomeEmail = async(email, name) => {
    const recipient =[{
        email
    }]
    const serverUrl = process.env.SERVER_URL;
    const URL = process.env.NODE_ENV === "development" ? `${serverUrl}forms` : null
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "90c5cfc8-ef96-420f-809e-bc71c14b8074",
            template_variables: {
                name,
                URL

            }
        })
        console.log("Welcome Email sent succesfully", response)
    } catch(error) {
        console.error(error)
    }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{
        email
    }];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset"
        })

        console.log("Password Reset Request Email sent successfully", response)
    } catch(error) {
        console.error(error)
    }
}

export const sendResetSuccessEmail = async (email) => {
    const recipient = [{
        email
    }];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset Success"
        })

        console.log("Password Reset Success Email sent successfully", response)
    } catch(error) {
        console.error(error)
    }
}