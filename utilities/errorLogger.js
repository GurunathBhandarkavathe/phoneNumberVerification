const fs = require('fs');

const errorLogger = (err, req, res, next) => {
    if (err) {
        const errorDetails = {
            timestamp: new Date().toISOString(),
            method: req.method,
            url: req.originalUrl,
            status: err.status,
            message: err.message,
            stack: err.stack.split('\n') // convert stack trace to array for readability
        };

        // Format the log as JSON string with pretty print and actual line breaks
        const logString = JSON.stringify(errorDetails, null, 2) + '\n\n';

        fs.appendFile('./logs/error.log', logString, (fsErr) => {
            if (fsErr) {
                console.error('Failed to write to error log:', fsErr);
            }
        });

        // Send response
        res.status(err.status || 500).json({
            status: 'error',
            message: err.message || 'Internal Server Error'
        });

        next();
    }
};

module.exports = errorLogger;