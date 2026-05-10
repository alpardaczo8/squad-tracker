const db = require('./database');

function createTables() {
    db.exec(`
        CREATE TABLE IF NOT EXISTS players (
            player_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            position TEXT NOT NULL,
            date_of_birth TEXT NOT NULL,
            nationality TEXT,
            is_opponent INTEGER NOT NULL DEFAULT 0
        )`
    );
    db.exec(`    
        CREATE TABLE IF NOT EXISTS matches (
            match_id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            opponent_name TEXT NOT NULL,
            venue TEXT NOT NULL,
            our_score INTEGER NOT NULL DEFAULT 0,
            opponent_score INTEGER NOT NULL DEFAULT 0,
            possession REAL,
            shots INTEGER,
            shots_on_target INTEGER,
            opponent_shots INTEGER,
            opponent_shots_on_target INTEGER
        )
    `);
    db.exec(`    
        CREATE TABLE IF NOT EXISTS player_match_stats (
            player_id INTEGER NOT NULL,
            match_id INTEGER NOT NULL,
            minutes_played INTEGER DEFAULT 0,
            goals INTEGER DEFAULT 0, 
            yellow_cards INTEGER DEFAULT 0,
            red_card INTEGER DEFAULT 0,
            rating REAL,
            PRIMARY KEY (player_id, match_id),
            FOREIGN KEY (player_id) REFERENCES players(player_id) ON DELETE CASCADE,
            FOREIGN KEY (match_id) REFERENCES matches(match_id) ON DELETE CASCADE
        );
    `);

    console.log('Tables created successfully');       
}

module.exports = { createTables };