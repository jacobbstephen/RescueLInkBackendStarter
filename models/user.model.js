const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        match: [/^[A-Za-z\s]+$/, 'Name can only contain alphabets and spaces.'],
    },

    email: {
        type:String,
        required: true,
        trim: true,
        unique: true,
        minlength: [11 , 'Email must be atleast 11 characters']
    },
    password: {
        type:String,
        required: true,
        trim: true,
        minlength: [6, 'Password must be atleast 6 characters']
    },
    phoneNo: {
        type:String,
        required: true,
        trim: true,
        unique: true,
        minlength: [10 , 'PhoneNo must be atleast 10 characters'],
        match: [/^\d+$/, 'Phone can only be  digits.'],
    },
    latitude: {
        type:String,
        trim: true,
        required: true,
    },

    longitude: {
        required: true,
        type:String,
        trim: true,
    }
})


const user = mongoose.model('user', userSchema);
module.exports = user;