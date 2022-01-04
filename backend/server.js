const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json())

// Realising connection to database and setup behaviour on connect, error and disconnect

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;

connection.on("connected", () => {
    console.log("MongoDB database connection estabilished successfully");
});

connection.on("error", (error) => {
    throw error;
});

connection.on("disconnected", () => {
    console.log("Disconnected from database!");
});

// End setup connection

connection.once("open", () => {
    console.log("MongoDB database opened");
})

// Creating routes for the items
const itemsRouter = require("./routes/items");
const usersRouter = require("./routes/users");

app.use("/items", itemsRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
