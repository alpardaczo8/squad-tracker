const { addTeam, getAllTeams } = require('../db/teams')
const express = require('express');

const router = express.Router();

router.get('/teams', (req, res) => {
    try {
        const teams = getAllTeams();
        res.render('teams', { teams });
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong while trying to get all teams!");
    }
});

router.post('/teams/add', (req, res) =>{
    try {
        let is_our_team = req.body.is_our_team ? 1 : 0;
        addTeam(req.body.name, req.body.country, is_our_team);
        console.log('Adding new team');
        res.redirect('/teams');
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong while adding a team!");
    }
});

module.exports = router;