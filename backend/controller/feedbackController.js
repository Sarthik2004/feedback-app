import feedback from "../models/feedback.js";

export const createFeedback = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const userFeedback = await feedback.create({ name, email, message });

    res.status(200).json({
      message: "feedback created successfully",
      data: userFeedback,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFeedback = async (req, res) => {
  try {
    const userFeedback = await feedback.find().sort({ createdAt: -1 });
    res.status(200).json(userFeedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFeedback = async (req, res) => {
  try {
    await feedback.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Feedback delete successfully" });
  } catch (error) {
    res.status(500).json({ message: message.error });
  }
};
