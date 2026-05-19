const db = require('./database');

function addTeam(name, country, is_our_team) {
    const stmt = db.prepare(`
        INSERT INTO Teams (name, country, is_our_team)
        VALUES (?, ?, ?)
    `);
    stmt.run(name, country, is_our_team);
}

function getAllTeams() {
    const stmt = db.prepare(`
        SELECT * FROM Teams
    `);
    console.log('Teams retrieved from the database')
    return stmt.all()
}

module.exports = { addTeam, getAllTeams };
