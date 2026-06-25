import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";

dotenv.config();
connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/feedback", feedbackRoutes);

app.use("/", (req, res) => {
  res.send("api is running....");
});

const port = process.env.PORT || 5000;

app.listen(port, (req, res) => {
  console.log(`Port is running on ${port}`);
});
