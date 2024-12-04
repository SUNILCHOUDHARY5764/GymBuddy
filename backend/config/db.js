const mysql = require('mysql2/promise');
require('dotenv').config();

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST, // MySQL host
    user: process.env.DB_USER, // MySQL username
    password: process.env.DB_PASSWORD, // MySQL password
    database: process.env.DB_NAME, // Database name
    waitForConnections: true, // Wait for connections if pool is busy
    connectionLimit: 10, // Limit the number of connections in the pool
    queueLimit: 0 // Unlimited queue
});

// Export the pool for use in other parts of your application
module.exports = pool;
