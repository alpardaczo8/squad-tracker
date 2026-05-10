const db = require('./database');

function addPlayer(name, position, date_of_birth) {
    const stmt = db.prepare(`
        INSERT INTO players (name, position, date_of_birth)
        VALUES (?, ?, ?)
    `);
    stmt.run(name, position, date_of_birth);
}

function getAllPlayers() {
    const stmt = db.prepare(`
        SELECT * FROM players
    `);
    console.log('Player inserted to the players table')
    return stmt.all()
}

module.exports = { addPlayer, getAllPlayers };