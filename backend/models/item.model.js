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
        required: false,
        trim: true
    },
    date: {
        type: Date,
        required: false
    },
    image: {
        type: String,
        required: true
    },
    concreteImage: {
        data: Buffer,
        contentType: String,
        size: Number,
        name: String,
        concreteImageBase64: String
    }
}, {
    timestamps: true
})

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;