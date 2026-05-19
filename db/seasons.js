const db = require('./database');

function addSeason(name, is_current) {
    if (is_current) {
        db.prepare(`UPDATE Seasons SET is_current = 0`).run();
    }
    db.prepare(`INSERT INTO Seasons (name, is_current) VALUES (?, ?)`).run(name, is_current ? 1 : 0);
}

function getAllSeasons() {
    const stmt = db.prepare(`
        SELECT * FROM Seasons
    `);
    console.log('Seasons retrieved from the database')
    return stmt.all()
}

module.exports = { addSeason, getAllSeasons };