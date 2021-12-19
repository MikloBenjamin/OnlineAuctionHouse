const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.set("debug", true);

// This is the table
const inventorySchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    owner: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String,
        size: Number,
        name: String,
        imageBase64: String
    },
    bidprice: {
        type: Number,
        required: false
    }
}, {
    timestamps: true
})

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;