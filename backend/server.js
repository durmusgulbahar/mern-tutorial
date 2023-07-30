require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');
var cors = require('cors')

const PORT = process.env.PORT || 4000;
const DB_URI = process.env.DB_URI;
// Create express app
const app = express();
app.use(cors())
app.use(express.json());

//routes
app.use('/api/workouts',workoutRoutes);
app.use('/api/user',userRoutes);
// Connect to MongoDB
mongoose.connect(DB_URI).then(() => {
    app.listen(PORT, () => {
        console.log("Connected to DB & Server is listening on port ", PORT);
    });
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
});
// Listen for requests
