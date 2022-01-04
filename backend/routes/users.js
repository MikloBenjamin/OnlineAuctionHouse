const router = require("express").Router();
const nodemailer = require("nodemailer");
const path = require("path");
const multer = require("multer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let User = require("../models/user.model");
let Item = require("../models/item.model");
let Inventory = require("../models/inventory.model");

require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL,
        pass: process.env.MPWD
    }
});

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

function sendConfirmationEmail(name, email, confirmation_code){
    transporter.sendMail({
        from: process.env.MAIL,
        to: email,
        subject: "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:3000/login/${confirmation_code}>Confirm</a>
        </div>`
    }, (error, info) => {
        if (error){
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}

router.post("/login/user/", (req, res) => {
    auth(req.body.username, req.body.password, (error, user) => {
        if (error){
            res.send("error");
        }
        if (user){
            clientUser = {
                uid: user._id,
                username: user.username,
                email: user.email,
                about: user.about,
                firstname: user.firstname,
                lastname: user.lastname,
                status: user.status
            }
            res.send(clientUser);
        } else {
            res.send("null");
        }
    });
});

router.post("/register/user/", (req, res) => {    
    bcrypt.hash(req.body.password, 10, (error, hashedpwd) => {
        if (error){
            res.json(error);
            return;
        }

        const token = jwt.sign({email: req.body.email}, process.env.SECRET)
        const user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            password: hashedpwd,
            about: req.body.about,
            status: 'Pending',
            confirmation_code: token
        });

        sendConfirmationEmail(user.firstname + " " + user.lastname, user.email, token);

        user.save()
            .then(() => res.json("User registered!"))
            .catch(error => res.status(400).json("Error: " + error));
    });
});

router.get("/:username", (req, res) => {    
    User.findOne({username: req.params.username}, function(error, user){
        if (error){
            res.send("error");
        }
        if (user){
            clientUser = {
                uid: user._id,
                username: user.username,
                email: user.email,
                about: user.about,
                firstname: user.firstname,
                lastname: user.lastname
            }
            res.send(clientUser);
        } else {
            res.send("null");
        }
    });
});

router.get("/user/:id", (req, res) => {
    var items = {
        userListings: [],
        userFollowedPosts: [],
        userInventory: []
    }
    User.findById(req.params.id, (error, user) => {
        if (error){
            res.send("error");
        }
        if (user){
            console.log(user.username);
            Item.find({owner: user.username})
                .then(userListings => {
                    items.userListings = userListings;
                    console.log(userListings.length);
                    Inventory.find({owner: user.username})
                        .then((userInventory) => {
                            items.userInventory = userInventory;
                            Item.find()
                                .then((allItems) => {
                                    allItems.forEach((item) => {
                                        item.followingUsers.forEach((username) => {
                                            if (username === user.username){
                                                items.userFollowedPosts.push(item);
                                            }
                                        });
                                    });
                                    res.json(items);
                                }).catch(error => res.status(400).json("Error: " + error));
                        })
                        .catch(error => res.status(400).json("Error: " + error));
                })
                .catch(error => res.status(400).json("Error: " + error));
        } else {
            res.send("null");
        }
    });
});

router.post("/confirm/", (req, res) => {
    if (req.body.ccode){
        User.findOne({confirmation_code: req.body.ccode})
            .then((user) => {
                if (!user){
                    res.status(404).send({message: "User not found!"});
                }
                
                user.status = "Active";
                user.save().catch(error => res.status(400).json("Error: " + error));
            })
            .catch(error => { console.log("error", error); })
    }
});

module.exports = router;