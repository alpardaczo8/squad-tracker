const db = require('./database');

function addPlayer(name, position, dateOfBirth) {
    const stmt = db.prepare(`
        INSERT INTO players (name, position, dateOfBirth)
        VALUES (?, ?, ?)
    `);
    stmt.run(name, position, dateOfBirth);
}

function getAllPlayers() {
    const stmt = db.prepare(`
        SELECT * FROM players
    `);
    return stmt.all()
}

module.exports = { addPlayer, getAllPlayers };