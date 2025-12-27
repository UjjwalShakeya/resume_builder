// importing required modules
import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { createResume, deleteResume, getPublicResumeById, getResumeById, updateResume } from "../controllers/resumeController.js"
import upload from "../configs/multer.js";

// creating router instance
const resumeRouter = express.Router();

// creating endpoints which connects to controller functions

// create resume endpoint
resumeRouter.post('/create', protect, createResume);

// create resume endpoint with image upload
resumeRouter.put('/update', upload.single('image'), protect, updateResume);
// create resume endpoint with image upload
resumeRouter.delete('/delete/:resumeId', protect, deleteResume);
// get resume by id endpoint
resumeRouter.get('/get/:resumeId', protect, getResumeById);
// get public resume by id endpoint
resumeRouter.get('/public/:resumeId', getPublicResumeById);

// exporting the default resume router
export default resumeRouter;