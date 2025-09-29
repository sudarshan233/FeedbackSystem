import express from "express";

import { formSubmission } from "../controllers/form.controllers.js";

const router = express.Router();

router.post("/", formSubmission);

export default router;