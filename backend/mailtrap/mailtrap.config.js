import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN || "f94a56ec96e693bc0fd77846ea245427";
const ENDPOINT = process.env.MAILTRAP_ENDPOINT || "https://send.api.mailtrap.io/";

export const client = new MailtrapClient({
    endpoint: ENDPOINT,
    token: TOKEN,
});

export const sender = {
    email: "mailtrap@demomailtrap.co",
    name: "Jamie Dunn",
};