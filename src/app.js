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




const allowedOrigins = [
  "https://digital-sakhi-2-1.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
;


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
