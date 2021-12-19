const mongoose = require("mongoose");
const { isEmail } = require("validator");
const Schema = mongoose.Schema;

// This is the table
const userSchema= new Schema({
    firstname: {
        type: String,
        require: true,
        trim: true
    },
    lastname: {
        type: String,
        require: true,
        trim: true
    },
    username: {
        type: String,
        require: true,
        unique: true,
        minlength: 4,
        maxlength: 16,
        trim: true
    },
    email:{
        type: String,
        require: true,
        validate: [isEmail, "invalid email address"],
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
    about: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['Deactivated', 'Pending', 'Active'],
        default: 'Pending'
    },
    confirmation_code: {
        type: String,
        unique: true
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;