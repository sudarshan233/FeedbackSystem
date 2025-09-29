import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import forms from './routes/form.routes.js';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use('/api/forms', forms);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});