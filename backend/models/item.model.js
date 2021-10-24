const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// This is the table
const itemSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 5
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 10
    },
    date: {
        type: Date,
        required: false
    }
}, {
    timestamps: true
})



const Item = mongoose.model("Item", itemSchema);

module.exports = Item;