import express from "express";
import UserController from "../controllers/UserController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use('/update', authMiddleware)
router.get("/profile", authMiddleware);

router.post("/register", UserController.userRegistration);
router.post("/login", UserController.userLogin);

router.post("/update", UserController.userUpdate);
router.get("/profile", UserController.loggedInUser);

export default router;
