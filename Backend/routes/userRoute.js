import express from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";
// import { getUserProfile, updateUserProfile } from "../controllers/userController.js";
// import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔹 Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// 🔹 Protected Routes (Require JWT)
// router.get("/profile", protect, getUserProfile);
// router.put("/profile", protect, updateUserProfile);

export default router;
