

// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: [true, 'Name is required'],
//     },
//     password: {
//         type: String,
//         required: [true, 'Password is required'],
//     },
//     mobile: {
//         type: String,
//         required: [true, 'Mobile number is required'],
//         unique: true,
//     },
//     gender: {
//         type: String,
//         enum: ['male', 'female', 'other'],
//         required: [true, 'Gender is required']
//     }
// })


exports.validateUserData = (data) => {

    if (!data.name ||
        data.name.length < 4 ||
        data.name.length > 50) {
        throw createError('Name must be of total length between 4–50 characters');
    }

    return true;
};


exports.validateMobile = (mobile) => {
    // Mobile: Indian 10-digit starting 6–9 (adjust if you need intl formats)
    if (!mobile || !/^[6-9]\d{9}$/.test(mobile)) {
        throw createError('Valid mobile number is required (10 digits, starting with 6–9)');
    }

    return true
}


const createError = (message, status = 400) => {
    const err = new Error(message);
    err.status = status;
    return err;
};