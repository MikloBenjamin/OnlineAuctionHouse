const router = require("express").Router();
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const moment = require("moment");

let Item = require("../models/item.model");
let Inventory = require("../models/inventory.model");

router.route("/").get((req, res) => {
    Item.find()
        .then(items => res.json(items))
        .catch(error => res.status(400).json("Error: " + error));
});

router.route("/:id").get((req, res) => {
    Item.findById(req.params.id)
        .then(item => res.json(item))
        .catch(error => res.status(400).json("Error: " + error.response));
});

router.route("/edit/:id").get((req, res) => {
    Item.findById(req.params.id)
        .then(item => res.json(item))
        .catch(error => res.status(400).json("Error: " + error.response));
});

router.route("/delete/:id").delete((req, res) => {
    Item.findByIdAndDelete(req.params.id)
        .then(() => res.json("Item deleted!"))
        .catch(error => res.status(400).json("Error: " + error));
});

router.route("/update/:id").post((req, res) => {
    Item.findById(req.params.id)
        .then(item => {
            item.bidder = req.body.bidder;
            item.bidprice = req.body.bidprice;

            item.save()
                .then(() => res.json(item))
                .catch(error => res.status(400).json("Error: " + error));
        })
        .catch(error => res.status(400).json("Error: " + error));
});

router.route("/stash/:id").post((req, res) => {
    Item.findById(req.params.id)
        .then(item => {
            const inventoryItem = new Inventory({
                title: item.title,
                description: item.description,
                owner: item.bidder,
                image: item.image,
                bidprice: item.bidprice
            });

            inventoryItem.save()
                .then((response) => res.json(inventoryItem))
                .catch(error => res.status(400).json("Error: " + error));
        })
        .catch(error => res.status(400).json("Error: " + error));
});

router.route("/follow/:id").post((req, res) => {
    Item.findById(req.params.id)
        .then(item => {
            item.followingUsers.push(req.body.username);
            item.save()
                .then(() => res.json(item))
                .catch(error => res.status(400).json("Error: " + error));
        })
        .catch(error => res.status(400).json("Error: " + error));
});

router.route("/unfollow/:id").post((req, res) => {
    Item.findById(req.params.id)
        .then(item => {
            item.followingUsers = item.followingUsers.filter((username) => {
                return username !== req.body.username
            });
            item.save()
                .then(() => res.json(item))
                .catch(error => res.status(400).json("Error: " + error));
        })
        .catch(error => res.status(400).json("Error: " + error));
});

router.route("/following/").post((req, res) => {
    Item.findById(req.body.itemId)
        .then((item) => {
            if (item.followingUsers.includes(req.body.username)){
                res.json({following: true});
            } else {
                res.json({following: false})
            }
        })
        .catch(error => res.status(400).json("Error: " + error));
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

router.post("/createWithImage", upload.single("image"), (req, res) => {
    const imageContent = fs.readFileSync(req.file.path)

    biddingtime = moment();
    biddingtime.add(parseInt(req.body.hours), "hours");
    biddingtime.add(parseInt(req.body.minutes), "minutes");

    const newItem = new Item({
        title: req.body.title,
        description: req.body.description,
        owner: req.body.owner,
        image: {
            data: imageContent,
            contentType: req.file.mimetype,
            size: req.file.size,
            name: req.file.filename,
            imageBase64: imageContent.toString("base64"),
            followingUsers: []
        },
        bidenddate: biddingtime.toDate(),
        startingprice: req.body.startingprice,
        bidprice: 0.0,
        bidder: ""
    });

    newItem.save()
        .then(() => res.json("Item created!"))
        .catch(error => res.status(400).json("Error: " + error));
});

module.exports = router;