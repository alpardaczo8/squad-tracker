const { addPlayer, getAllPlayers } = require('../db/players');
const express = require('express');

const router = express.Router();

router.get('/players', (req, res) => {
    try {
        const players = getAllPlayers();
        res.render('players', { players });
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong!");
    }
});

router.post('/addPlayer', (req, res) => {
    try {
        addPlayer(req.body.name, req.body.position, req.body.date_of_birth);
        res.redirect('/players');
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong with adding a new player!");
    }
});

module.exports = router;