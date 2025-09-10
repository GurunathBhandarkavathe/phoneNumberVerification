const express = require('express');
const dotenv = require('dotenv');
const db = require('./models/database')
const route = require('./routes/routing')
dotenv.config({ quiet: true });
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/', route)
const PORT = process.env.PORT || 3200;


// Start server after DB connection
const startServer = async () => {
    try {
        // Ensure DB connection is established
        if (!db) {
            console.error('Failed to connect to database. Server not started.');
            process.exit(1);
        }
        
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Server startup failed:', error);
        process.exit(1);
    }
};

startServer()




