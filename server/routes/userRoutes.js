// importing required modules

import express from "express";
import { getUserById, getUserResumes, loginUser, registerUser } from "../controllers/userController.js";
// importing authentication middleware
import protect from "../middlewares/authMiddleware.js";


// creating router instance
const userRouter = express.Router();

// creating endpoints which connects to controller functions

// endpoint for user registration
userRouter.post("/register", registerUser);
// endpoint for user login
userRouter.post("/login", loginUser);
// endpoint to get user data, protected by authentication middleware

userRouter.get("/data", protect, getUserById);

// endpoint to get user resumes, protected by authentication middleware
userRouter.get("/resumes", protect, getUserResumes);

// exporting the default user router
export default userRouter;