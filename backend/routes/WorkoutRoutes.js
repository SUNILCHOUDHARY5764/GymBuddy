const { Router } = require('express');
const { getWorkouts } = require('../models/WorkoutModel'); // Import the appropriate model function

const workoutRouter = Router();

// Route to get workouts with filters
workoutRouter.get("/", async (req, res) => {
    const { difficulty, target, category } = req.query;
    const filters = {};
    
    // Apply filters to the query
    if (difficulty) filters.Difficulty = difficulty;
    if (target) filters.target = target; // Assume target is a direct match for simplicity
    if (category) filters.Category = category;

    try {
        // Call the model function to get workouts
        getWorkouts(filters, (err, workouts) => {
            if (err) {
                console.error('Error retrieving workouts:', err);
                return res.status(500).send({ msg: err.message });
            }
            console.log(workouts)
            res.status(200).send(workouts);
        });
    } catch (error) {
        res.status(500).send({ msg: error.message });
    }
});

module.exports = { workoutRouter };
