import express from "express";
import {
  createFeedback,
  deleteFeedback,
  getFeedback,
} from "../controller/feedbackController.js";

const router = express.Router();

router.post("/", createFeedback);
router.get("/", getFeedback);
router.delete("/:id", deleteFeedback);

export default router;
