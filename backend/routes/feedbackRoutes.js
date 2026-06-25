import express from "express";
import { createFeedback } from "../controller/feedbackController.js";

const router = express.Router();

router.post("/", createFeedback);

export default router;
