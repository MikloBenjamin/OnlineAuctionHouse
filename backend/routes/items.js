const router = require("express").Router();
const app = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
let Item = require("../models/item.model");

router.route("/").get((req, res) => {
    Item.find()
        .then(items => res.json(items))
        .catch(error => res.status(400).json("Error: " + error));
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
            item.name = req.body.name;
            item.description = req.body.description;
            item.date = Date.parse(req.body.date);

            item.save()
                .then(() => res.json("Item updated!"))
                .catch(error => res.status(400).json("Error: " + error));
        })
        .catch(error => res.status(400).json("Error: " + error));
});

router.route("/create").post((req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const date = Date.parse(req.body.date);
    var images = req.body.images;

    const newItem = new Item({name, description, date, images});

    newItem.save()
        .then(() => res.json("Item created!"))
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

    const newItem = new Item({
        name: req.body.name,
        description: req.body.description,
        date: Date.parse(req.body.date),
        image: req.file.filename,
        concreteImage: {
            data: imageContent,
            contentType: req.file.mimetype,
            size: req.file.size,
            name: req.file.filename,
            concreteImageBase64: imageContent.toString("base64")
        }
    });

    newItem.save()
        .then(() => res.json("Item created!"))
        .catch(error => res.status(400).json("Error: " + error));
});

module.exports = router;