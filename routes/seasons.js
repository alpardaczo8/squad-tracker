const { addSeason, getAllSeasons } = require('../db/seasons')
const express = require('express');

const router = express.Router();

router.get('/seasons', (req, res) => {
    try {
        const seasons = getAllSeasons();
        res.render('seasons', { seasons });
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong while trying to get all seasons!");
    }
});

router.post('/seasons/add', (req, res) => {
    try {
        let is_current = req.body.is_current ? 1 : 0;
        addSeason(req.body.name, is_current);
        res.redirect('/seasons');
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong while trying to add a season!");
    }
});

module.exports = router;