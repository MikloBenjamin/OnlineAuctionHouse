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
    auth(req.body.username, req.body.password, (error, user) => {
        if (error){
            console.log(error);
            res.send("error");
        }
        if (user){
            console.log("user found");
            clientUser = {
                username: user.username,
                email: user.email,
                about: user.about,
                firstname: user.firstname,
                lastname: user.lastname
            }
            res.send(clientUser);
        } else {
            console.log("user not found");
            res.send("null");
        }
    });
});

router.post("/register/user/", (req, res) => {    
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

router.get("/:username", (req, res) => {    
    console.log(req.params)
    User.findOne({username: req.params.username}, function(error, user){
        if (error){
            console.log(error);
            res.send("error");
        }
        if (user){
            console.log("user found");
            clientUser = {
                username: user.username,
                email: user.email,
                about: user.about,
                firstname: user.firstname,
                lastname: user.lastname
            }
            res.send(clientUser);
        } else {
            console.log("user not found");
            res.send("null");
        }
    });
});

module.exports = router;