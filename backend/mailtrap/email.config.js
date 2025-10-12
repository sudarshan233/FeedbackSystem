import nodeMailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.EMAIL_USERNAME)
console.log(process.env.EMAIL_PASSWORD)

export const mailerClient = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD

    }
})