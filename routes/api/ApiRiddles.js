const express = require("express");
const router = express.Router();

// Riddles model
const Riddle = require("../../models/Riddles");
// .get(RiddlesController.findAll)

// @route  GET api/riddles
// @desc   Get all Riddles
// @Access Public
router.get("/", (req, res) => {
    Riddle.find()
        .then(riddles => res.json(riddles))
        .catch(error => console.log(error));
});

module.exports = router;
