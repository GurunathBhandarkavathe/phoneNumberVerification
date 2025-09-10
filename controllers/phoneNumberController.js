const { User } = require('../models/userModel');
const helpers = require('../utilities/helpers');
const validators = require('../utilities/validators');
const jwtAuth = require('../utilities/jwtAuth')
const mongoSanitize = require('mongo-sanitize');


exports.verifyMobileNumber = async (req, res, next) => {
    try {

        const { name, mobile } = req.body
        const sanitizedMobile = mongoSanitize(mobile);
        const sanitizedName = mongoSanitize(name);


        if (validators.validateMobile(sanitizedMobile)) {
            const existing = await User.findOne({ mobile: sanitizedMobile });
            if (existing) {
                return res.status(400).json({ message: 'User with mobile number already registered' });
            }
            await helpers.sendOtp(sanitizedMobile)
            const token = jwtAuth.generateToken(sanitizedMobile, sanitizedName)
            res.status(200).json({ message: 'OTP sent successfully . Please verify within 2 minutes.', token });

        }
    } catch (error) {
        next(error)
    }
}

exports.verifyOtpAndRegister = async (req, res, next) => {
    try {
        const { otp } = req.body
        const user = req.user

        // 2 min validation
        if (Date.now() - user.otpRequestedAt > 2 * 60 * 1000) {
            return res.status(400).json({ message: 'OTP expired. Please request a new one.' });
        }
        const verified = await helpers.verifyOtp(user.mobile, otp);

        if (!verified) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        const newUser = await User.create(req.user)
        res.status(201).json({
            message: 'User registered successfully',
            user: newUser
        });

    } catch (error) {
        next(error)
    }
}


exports.invalid = (req, res, next) => {
    const error = new Error('Invalid Route');
    error.status = 404;
    next(error);
};
