// importing required modules

import express from "express";
import { getUserById, loginUser, registerUser } from "../controllers/userController";
// importing authentication middleware
import protect from "../middlewares/authMiddleware";


// creating router instance
const userRouter = express.Router();

// creating endpoints which connects to controller functions
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/data", protect, getUserById);

// exporting the default user router
export default userRouter;