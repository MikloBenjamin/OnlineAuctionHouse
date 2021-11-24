const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const bcrypt = require("bcrypt");
let User = require("../models/user.model");

// Setup multer for storage
var multerDiskStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join("../public/uploads/"));
    },
    filename: function(req, file, cb){  
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

var multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")){
        cb(null, true);
    }
    else {
        cb("Please upload only images.", false);
    }
};

var upload = multer({
    storage: multerDiskStorage,
    fileFilter: multerFilter
});

function auth(username, password, callback){
    User.findOne({username: username}, (error, user) => {
        if (!user) {
            return callback(new Error("User not found!"));
        }
        // console.log(user)
        // console.log({pwd: password, userpwd: user.password})
        bcrypt.compare(password, user.password, (error, result) => {
            if (error){
                return callback(error);
            }
            if (result){
                return callback(null, user);
            }
            return callback("Passwords does not match");
        })
    });
}

router.post("/login/user/", (req, res) => {
    console.log(res);
    auth(req.body.username, req.body.password, (error, user) => {
        if (error){
            console.log(error);
            // res.data = "error";
            res.send("error");
        }
        if (user){
            console.log("user found");
            // res.data = user;
            clientUser = {
                username: user.username,
                email: user.email,
                about: user.about,
                firstname: user.firstname,
                lastname: user.lastname
            }
            res.send(clientUser);
        } else {
            console.log("user found");
            // res.data = "null";
            res.send("null");
        }
    });
});

router.post("/register/user/", (req, res) => {
    console.log(req.body);
    
    bcrypt.hash(req.body.password, 10, (error, hashedpwd) => {
        const newUser = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            password: hashedpwd,
            about: req.body.about
        });
        newUser.save()
            .then(() => res.json("User registered!"))
            .catch(error => res.status(400).json("Error: " + error));
    });
});

module.exports = router;