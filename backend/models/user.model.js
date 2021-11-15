const mongoose = require("mongoose");
const MimeNode = require("nodemailer/lib/mime-node");
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
        minlength: 5,
        maxlength: 8,
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
        minlength: 8,
        trim: true
    },
    about: {
        type: String,
        trim: true
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;