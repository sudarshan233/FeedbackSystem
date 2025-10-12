import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors'

import authRoutes from "./routes/auth.routes.js";
import formRoutes from "./routes/form.routes.js";
import {connectDB} from "./config/database.js";
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/forms', formRoutes);
app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});