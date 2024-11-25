const express = require("express");
const router = express.Router();
const { registerUser, loginUser, userProfile } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");


router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/get-profile", authMiddleware, userProfile)


module.exports = router;