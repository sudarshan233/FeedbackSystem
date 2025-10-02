import express from "express";

import {
    createForms,
    submitForms
} from "../controllers/form.controllers.js";

const router = express.Router();

router.post("/create-forms", createForms);
router.post("/submit-forms/:id", submitForms);

export default router;