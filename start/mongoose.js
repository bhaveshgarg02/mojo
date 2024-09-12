require('dotenv').config(); // Load environment variables from .env file
const mongoose = require('mongoose');

const dbURI = process.env.DB_URI; // Use the environment variable for the database URI

// Connect to MongoDB without deprecated options
mongoose.connect(dbURI);

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('Database connection error:', error);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});

module.exports = db;
