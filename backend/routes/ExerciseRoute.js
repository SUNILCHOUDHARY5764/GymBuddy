const { Router } = require('express');
const { addExercise, getExercises } = require('../models/ExerciseModel');

const exerciseRouter = Router();

// Route to get exercises
exerciseRouter.get("/", async (req, res) => {
    try {
        const workouts = await getExercises();
        res.send(workouts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to add multiple exercises
exerciseRouter.post("/add", async (req, res) => {
    const { userId, username, exercises } = req.body;

    if (!Array.isArray(exercises)) {
        return res.status(400).json({ error: "Invalid exercise data format" });
    }

    try {
        const results = await Promise.all(
            exercises.map(exercise => addExercise({ ...exercise, userId, username }))
        );
        res.status(201).json({ message: "Exercises added successfully", exercises: results });
    } catch (error) {
        res.status(500).json({ error: "Failed to add exercises", details: error.message });
    }
});

module.exports = { exerciseRouter };
