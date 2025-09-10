const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ quiet: true });
const mongoURL = process.env.MONGODB_LOCAL_URL

mongoose.connect(mongoURL)
const db = mongoose.connection;

// define event handlers for the connection
db.on('connected', () => {
    console.log('Connected to MongoDB Successfully');
});

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

module.exports = db

