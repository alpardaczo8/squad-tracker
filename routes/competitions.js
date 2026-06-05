const express = require('express');
const { getAllCompetitions, addCompetition } = require('../db/competitions');
const { getAllSeasons } = require('../db/seasons');

const router = express.Router();

router.get('/competitions', (req, res) => {
    try {
        const competitions = getAllCompetitions();
        const seasons = getAllSeasons();
        res.render('competitions', { competitions, seasons });
    } catch (err) {
        console.log(err);
        res.status(500).send('Something went wrong!');
    }
});

router.post('/competitions/add', (req, res) => {
    try {
        addCompetition(req.body.name, req.body.type, req.body.season_id);
        res.redirect('/competitions');
    } catch (err) {
        console.log(err);
        res.status(500).send('Something went wrong with at competition/add')
    }
});

module.exports = router;