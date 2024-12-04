const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { addUser, getUserByEmail } = require("../models/UserModel");
const { Validator } = require("../middlewares/Vaildator");

const UserRouter = express.Router();

// Register User
UserRouter.post("/register", Validator, async (req, res) => {
    const { name, email, password, gender, age, height, weight, disease } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = { name, email, password: hashedPassword, gender, age, height, weight, disease };

        await addUser(userData);
        res.status(200).send({ msg: "Account created!" });
    } catch (err) {
        console.error(err);
        res.status(400).send({ err: err.message });
    }
});

// Login User
UserRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await getUserByEmail(email);
        if (!user || user.length === 0) {
            return res.status(400).send({ msg: "User not found" });
        }
        
        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            return res.status(400).send({ msg: "Email and Password mismatch" });
        }

        const token = jwt.sign({ userId: user[0].id, username: user[0].name }, process.env.JWT_SECRET, {
            expiresIn: '1h' // Optional
        });

        const cookieOptions = {
            expires: new Date(
                Date.now() + process.env.JWT_EXPIRES_IN * 24*60*60*1000),
                httpOnly: true,
                sameSite: "None",
                secure: true
        }

        console.log(token);
        res.cookie('jwt', token, cookieOptions);
        res.status(200).send({ msg: "Login Successful!", token, username: user[0].name, userDetails: user[0] });
    } catch (error) {
        console.error(error);
        res.status(500).send({ err: error.message });
    }
});

module.exports = {
    UserRouter
};
