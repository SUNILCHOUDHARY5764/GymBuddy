const pool = require('../config/db'); // Assuming this points to your config/db.js
require('dotenv').config();

// Function to add a new workout
const addWorkout = (workoutData, callback) => {
    const {
        exercise_name,
        videoURL,
        steps,
        Category,
        Difficulty,
        Forces,
        Grips,
        target,
        youtubeURL,
        details
    } = workoutData;

    const query = `
        INSERT INTO workout (
            exercise_name, videoURL, steps, Category, Difficulty, 
            Forces, Grips, target, youtubeURL, details
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    pool.query(
        query,
        [
            exercise_name,
            videoURL,
            JSON.stringify(steps), // Assuming steps is an array or JSON object
            Category,
            Difficulty,
            Forces,
            Grips,
            JSON.stringify(target), // Assuming target is a JSON object
            youtubeURL,
            details
        ],
        (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                return callback(err);
            }
            callback(null, results);
        }
    );
};

// Function to get all workouts with filters
const getWorkouts = (filters, callback) => {
    let query = 'SELECT * FROM workout';
    const queryParams = [];

    const conditions = [];
    if (filters.Difficulty) {
        conditions.push("Difficulty = ?");
        queryParams.push(filters.Difficulty);
    }
    if (filters.target) {
        // Assuming 'target' is a JSON column, use JSON_EXTRACT to filter based on primary target
        conditions.push("JSON_EXTRACT(target, '$.Primary') = ?");
        queryParams.push(filters.target);
    }
    if (filters.Category) {
        conditions.push("Category = ?");
        queryParams.push(filters.Category);
    }

    // Apply conditions if present
    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
    }

    // Limit the result to 20 entries
    query += ' LIMIT 20';

    // Execute the query
    pool.query(query, queryParams, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return callback(err);
        }
        console.log(results)
        callback(null, results);
    });
};

// Function to update a workout by ID
const updateWorkout = (workoutId, workoutData, callback) => {
    const {
        exercise_name,
        videoURL,
        steps,
        Category,
        Difficulty,
        Forces,
        Grips,
        target,
        youtubeURL,
        details
    } = workoutData;

    const query = `
        UPDATE workout SET 
            exercise_name = ?, 
            videoURL = ?, 
            steps = ?, 
            Category = ?, 
            Difficulty = ?, 
            Forces = ?, 
            Grips = ?, 
            target = ?, 
            youtubeURL = ?, 
            details = ? 
        WHERE id = ?
    `;

    pool.query(
        query,
        [
            exercise_name,
            videoURL,
            JSON.stringify(steps), // Assuming steps is an array or JSON
            Category,
            Difficulty,
            Forces,
            Grips,
            JSON.stringify(target), // Assuming target is JSON
            youtubeURL,
            details,
            workoutId
        ],
        (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                return callback(err);
            }
            callback(null, results);
        }
    );
};

// Function to delete a workout by ID
const deleteWorkout = (workoutId, callback) => {
    const query = 'DELETE FROM workout WHERE id = ?';

    pool.query(query, [workoutId], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return callback(err);
        }
        callback(null, results);
    });
};

module.exports = {
    addWorkout,
    getWorkouts,
    updateWorkout,
    deleteWorkout
};
