const router = require("express").Router();
let Item = require("../models/item.model");

router.route("/").get((req, res) => {
    Item.find()
        .then(items => res.json(items))
        .catch(error => res.status(400).json("Error: " + error));
});

router.route("/add").post((req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const date = Date.parse(req.body.date);

    const newItem = new Item({name, description, date});

    newItem.save()
        .then(() => res.json("Item added!"))
        .catch(error => res.status(400).json("Error: " + error));
});

module.exports = router;