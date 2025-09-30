import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from "./routes/auth.routes.js";
import formRoutes from "./routes/form.routes.js";
import {connectDB} from "./config/database.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
connectDB()
app.use('/api/forms', formRoutes);
app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});