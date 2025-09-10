const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ quiet: true });

const jwtSecret = process.env.JWT_SECRET || 'my_default_secret';

const jwtExpiry = '5m'; // Default expiry time for JWT
exports.generateToken = (mobile, name) => {
    const payload = {
        mobile: mobile,
        name: name,
        otpRequestedAt: Date.now()
    }
    return jwt.sign(payload, jwtSecret, {expiresIn: jwtExpiry});
}

exports.verifyToken = (req,res,next) => {
    const autheHeader = req.headers['authorization'];
    const token = autheHeader && autheHeader.split(' ')[1];
    if (!token) {
        const error = new Error('No authentication token provided. Please login to continue.');
        error.status = 401;
        return next(error);
    }
    
    jwt.verify(token, jwtSecret, (err, payload) => {
        if (err) {
            const error = new Error('Invalid authentication token or token expired. Please login again.');
            error.status = 403;
            return next(error);
        }
        req.user = payload;
        next();
    });
}