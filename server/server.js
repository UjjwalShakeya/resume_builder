// import necessary modules
import express from "express";
import cors from "cors";
import 'dotenv/config'; // This loads the .env file automatically

// creating express app
const app = express();

// creating PORT variable
const PORT = process.env.PORT || 3000;

// using express json middleware
app.use(express.json());

// using cors middleware
app.use(cors());

app.get('/', (req, res) => res.send('Server is live...'))

// app listening on 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

