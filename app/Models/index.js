require('dotenv').config(); // Load environment variables from .env file
const mongoose = require("mongoose");

async function initialize(msg) {
    try {
        const srv = process.env.DBSTRING;
        await mongoose.connect(srv, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connection successful');
    } catch (error) {
        console.error('Database connection error:', error);
    }
}

module.exports.initialize = initialize;
