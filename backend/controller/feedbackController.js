import feedback from "../models/feedback.js";

export const createFeedback = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newfeedback = await feedback.create({ name, email, message });

    res.status(200).json({
      message: "feedback created successfully",
      data: newfeedback,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
