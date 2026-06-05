const db = require('./database');

function getAllCompetitions() {
    const stmt = db.prepare(`
        SELECT 
            Competitions.*,
            Seasons.name AS season_name 
        FROM Competitions
        JOIN Seasons ON Competitions.season_id = Seasons.season_id
    `);
    console.log('Deriving all competitions from the database');
    return stmt.all();
}

function addCompetition(name, type, season_id) {
    console.log("Hallo");
    const stmt = db.prepare(`
        INSERT INTO Competitions(name, type, season_id)
        VALUES(?, ?, ?)
    `);
    console.log('Adding new competition');
    stmt.run(name, type, season_id);
}

module.exports = { getAllCompetitions, addCompetition }