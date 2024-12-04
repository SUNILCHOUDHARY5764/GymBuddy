const pool = require('../config/db');
const addExercise = async (exerciseData) => {
    const { exercise_name, videoURL, steps, Category, Difficulty, Forces, Grips, target, youtubeURL, details, userId, username } = exerciseData;

    const query = `
        INSERT INTO exercise (
            exercise_name, videoURL, steps, Category, Difficulty, 
            Forces, Grips, target, youtubeURL, details, userId, username
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    try {
        const [result] = await pool.execute(query, [
            exercise_name,
            JSON.stringify(videoURL),
            JSON.stringify(steps),
            Category,
            Difficulty,
            Forces,
            Grips,
            JSON.stringify(target),
            youtubeURL,
            details,
            userId,
            username
        ]);
        return result;
    } catch (error) {
        console.error("Error adding exercise:", error);
        throw error;
    }
};

// Function to get all exercises
const getExercises = async () => {
    const query = 'SELECT * FROM exercise';
    try {
        const [rows] = await pool.query(query);
        // console.log(rows);
        return rows;
    } catch (error) {
        console.error("Error fetching exercises:", error);
        throw error;
    }
};

module.exports = { addExercise, getExercises };
