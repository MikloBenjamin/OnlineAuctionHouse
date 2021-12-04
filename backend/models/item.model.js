const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// This is the table
const itemSchema = new Schema({
    title: {
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
    owner: {
        type: String,
        require: true
    },
    image: {
        data: Buffer,
        contentType: String,
        size: Number,
        name: String,
        imageBase64: String
    },
    likes: {
        type: Number,
        required: false
    },
    bidenddate: {
        type: Date,
        required: true
    },
    startingprice: {
        type: Number,
        required: true
    },
    bidder: {
        type: String,
        required: false
    }

}, {
    timestamps: true
})

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;