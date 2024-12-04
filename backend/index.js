const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { connection } = require("./config/db");
const { workoutRouter } = require("./routes/WorkoutRoutes");
const { UserRouter } = require("./routes/UserRoutes");
const { AuthMiddleware } = require("./middlewares/AuthMiddleware");
const { exerciseRouter } = require("./routes/ExerciseRoute");

const app = express();
app.use(cors());

app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
    res.send("OK");
});

app.use("/user", UserRouter);

// Use middleware for routes that require authentication
// app.use('/', AuthMiddleware)
app.use("/workouts", workoutRouter);
app.use("/exercise", exerciseRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});