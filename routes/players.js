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

module.exports = router;