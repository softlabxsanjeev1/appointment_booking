const express = require("express");
const router = express.Router();
const { registerUser, loginUser, userProfile, applyDoctor, markAllNotificationSeen, deleteAllNotifications } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");


router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/get-profile", authMiddleware, userProfile)
router.post("/apply-doctor-account", authMiddleware, applyDoctor)
router.post("/mark-all-notification-as-seen", authMiddleware, markAllNotificationSeen)
router.post("/delete-all-notification", authMiddleware, deleteAllNotifications)


module.exports = router;