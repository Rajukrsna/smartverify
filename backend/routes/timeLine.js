const express = require("express");
const router = express.Router();
const TimelineEvent = require("../models/TimelineEvent");
const Notification = require("../models/notification");
// ✅ Save an event after signing is completed
router.post("/save-event", async (req, res) => {
  try {
    const { userId, title, description, status } = req.body;

    const newEvent = new TimelineEvent({
      userId,
      title,
      description,
      status,
    });

    await newEvent.save();
    res.json({ success: true, message: "Event saved successfully" });
  } catch (error) {
    console.error("❌ Error saving event:", error);
    res.status(500).json({ error: "Failed to save event" });
  }
});

// ✅ Fetch timeline events for the user
router.get("/events/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const events = await TimelineEvent.find({ userId }).sort({ date: 1 });
    res.json(events);
  } catch (error) {
    console.error("❌ Error fetching events:", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

router.post("/transaction", async (req, res) => {
  try {
    const { userId, transactionId } = req.body;

    console.log("Transaction ID:", transactionId); // Debugging

    // Create a new notification instance
    const newNotification = new Notification({
      userId: userId,
      transactionId: transactionId
    });

    // Save the notification to the database
    await newNotification.save();

    res.status(201).json({ message: "Notification saved successfully." });
  } catch (error) {
    console.error("Error saving notification:", error);
    res.status(500).json({ error: "Failed to save notification." });
  }
});

router.get("/notifications/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({ userId }).sort({ date: -1 });
    res.json(notifications);
  } catch (error) {
    console.error("❌ Error fetching notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
}
);

module.exports = router;
