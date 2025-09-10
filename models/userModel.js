const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    mobile: {
        type: String,
        required: [true, 'Mobile number is required'],
        unique: true,
    }
},{strict:true})


const User = mongoose.model('users', userSchema);

module.exports = {
    User
}