const mysql = require("mysql2");
require("dotenv").config();

// Create MySQL connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Add User
const addUser = async (userData) => {
    const { name, email, password, gender, age, height, weight, disease } = userData;
    const query = `
        INSERT INTO user (name, email, password, gender, age, height, weight, disease) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    return new Promise((resolve, reject) => {
        connection.query(query, [name, email, password, gender, age, height, weight, disease], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// Get User by Email
const getUserByEmail = async (email) => {
    const query = `SELECT * FROM user WHERE email = ?`;
    return new Promise((resolve, reject) => {
        connection.query(query, [email], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// Export functions
module.exports = {
    addUser,
    getUserByEmail
};
