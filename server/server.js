// import necessary modules
import express from "express";
import cors from "cors";
import 'dotenv/config'; // This loads the .env file automatically
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";

// creating express app
const app = express();

// creating PORT variable
const PORT = process.env.PORT || 3000;

// using express json middleware
app.use(express.json());

// using cors middleware
app.use(cors());

app.get('/', (req, res) => res.send('Server is live...'))

// create user routes
app.use('/api/users', userRouter);
// create resume routes
app.use('/api/resumes', resumeRouter);

// app listening on 
app.listen(PORT, async () => {
    // database connection
    await connectDB();

    console.log(`Server is running on port ${PORT}`);
})

