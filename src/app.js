require("dotenv").config()
const express = require('express');
const cors = require("cors");

const app = express();

const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoute.routes');
const examRoutes = require('./routes/exam.routes');
const certificate = require('./routes/certifiecate.routes');
const result = require('./routes/result.routes');
const googleAuthRoutes = require("./routes/googleAuth.routes");




app.use(cors({
  origin: "https://digital-sakhi-20.netlify.app, https://digitalsakhi2-0-g31t.vercel.app/"
}));


// Connect to the databa
connectDB();


// Middleware to parse JSON requests


app.use(express.json());




// Sample route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api', userRoutes);
app.use('/api', examRoutes);
app.use('/api/certificate', certificate);
app.use('/api', result);

app.use("/auth", googleAuthRoutes);


module.exports = app;
