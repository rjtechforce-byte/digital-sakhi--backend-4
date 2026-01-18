require("dotenv").config()
const express = require('express');
const cors = require("cors");

const app = express();

const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoute.routes');
const examRoutes = require('./routes/exam.routes');
const certificate = require('./routes/certifiecate.routes');
const result = require('./routes/result.routes');



app.use(cors({
  origin: "https://digital-sakhi.netlify.app, https://digital-sakhi-churu.netlify.app"
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



module.exports = app;
