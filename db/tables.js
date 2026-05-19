const db = require('./database');

function createTables() {
    db.exec(`
        CREATE TABLE IF NOT EXISTS Teams (
            team_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            country TEXT,
            is_our_team INTEGER NOT NULL DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS Seasons (
            season_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            is_current INTEGER NOT NULL DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS Competitions (
            competition_id INTEGER PRIMARY KEY AUTOINCREMENT,
            season_id INTEGER NOT NULL,
            name TEXT NOT NULL,
            type TEXT NOT NULL,
            FOREIGN KEY(season_id) REFERENCES Seasons(season_id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS Players (
            player_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            position TEXT NOT NULL,
            date_of_birth TEXT NOT NULL,
            nationality TEXT,
            height INTEGER,
            preferred_foot TEXT
        );

        CREATE TABLE IF NOT EXISTS Transfers (
            transfer_id INTEGER PRIMARY KEY AUTOINCREMENT,
            player_id INTEGER NOT NULL,
            from_team_id INTEGER,
            to_team_id INTEGER,
            date TEXT,
            type TEXT,
            loan_end_date TEXT,
            FOREIGN KEY(player_id) REFERENCES Players(player_id) ON DELETE CASCADE,
            FOREIGN KEY(from_team_id) REFERENCES Teams(team_id) ON DELETE CASCADE,
            FOREIGN KEY(to_team_id) REFERENCES Teams(team_id) ON DELETE CASCADE
        );
        
        CREATE TABLE IF NOT EXISTS Matches (
            match_id INTEGER PRIMARY KEY AUTOINCREMENT,
            competition_id INTEGER,
            home_team_id INTEGER,
            away_team_id INTEGER,
            date TEXT NOT NULL,
            status TEXT NOT NULL,
            home_score INTEGER,
            away_score INTEGER,
            home_formation TEXT,
            away_formation TEXT,
            home_possession INTEGER,
            home_shots INTEGER,
            home_shots_on_target INTEGER,
            away_shots INTEGER,
            away_shots_on_target INTEGER,
            motm_player_id INTEGER,
            cup_round TEXT,
            extra_time INTEGER DEFAULT 0,
            penalty_shootout INTEGER DEFAULT 0,
            home_penalties_score INTEGER,
            away_penalties_score INTEGER,
            FOREIGN KEY(competition_id) REFERENCES Competitions(competition_id) ON DELETE CASCADE,
            FOREIGN KEY(home_team_id) REFERENCES Teams(team_id) ON DELETE CASCADE,
            FOREIGN KEY(away_team_id) REFERENCES Teams(team_id) ON DELETE CASCADE,
            FOREIGN KEY(motm_player_id) REFERENCES Players(player_id) ON DELETE CASCADE
        );
        
        CREATE TABLE IF NOT EXISTS Player_match_stats (
            player_id INTEGER NOT NULL,
            match_id INTEGER NOT NULL,
            team_id INTEGER NOT NULL,
            is_starter INTEGER NOT NULL,
            subbed_in_minute INTEGER,
            subbed_out_minute INTEGER,
            minutes_played INTEGER DEFAULT 0 NOT NULL,
            -- shooting
            goals INTEGER DEFAULT 0,
            shots INTEGER DEFAULT 0,
            shots_on_target INTEGER DEFAULT 0,
            -- passing
            assists INTEGER DEFAULT 0,
            key_passes INTEGER DEFAULT 0,
            short_passes_attempted INTEGER DEFAULT 0,
            short_passes_completed INTEGER DEFAULT 0,
            medium_passes_attempted INTEGER DEFAULT 0,
            medium_passes_completed INTEGER DEFAULT 0,
            long_passes_attempted INTEGER DEFAULT 0,
            long_passes_completed INTEGER DEFAULT 0,
            crosses_attempted INTEGER DEFAULT 0,
            crosses_completed INTEGER DEFAULT 0,
            -- Defensive
            tackles_attempted INTEGER DEFAULT 0,
            tackles_completed INTEGER DEFAULT 0,
            interceptions INTEGER DEFAULT 0,
            blocks INTEGER DEFAULT 0,
            clearances INTEGER DEFAULT 0,
            -- Ball Retention
            possession_won INTEGER DEFAULT 0,
            possession_lost INTEGER DEFAULT 0,
            -- Aerial duels
            headers_won INTEGER DEFAULT 0,
            headers_lost INTEGER DEFAULT 0,
            -- Ball
            dribbles_attempted INTEGER DEFAULT 0,
            dribbles_completed INTEGER DEFAULT 0,
            key_dribbles INTEGER DEFAULT 0,
            fouls_won INTEGER DEFAULT 0,
            -- Discipline
            fouls_committed INTEGER DEFAULT 0,
            penalty_conceded INTEGER DEFAULT 0,
            yellow_cards INTEGER DEFAULT 0,
            red_card INTEGER DEFAULT 0,
            -- Goalkeeping
            shots_faced INTEGER DEFAULT 0,
            penalties_faced INTEGER DEFAULT 0,
            penalties_saved INTEGER DEFAULT 0,
            shots_held INTEGER DEFAULT 0,
            shots_parried INTEGER DEFAULT 0,
            crosses_caught INTEGER DEFAULT 0,
            balls_stripped INTEGER DEFAULT 0,
            -- OVR
            rating REAL,
            PRIMARY KEY (player_id, match_id),
            FOREIGN KEY (player_id) REFERENCES Players(player_id) ON DELETE CASCADE,
            FOREIGN KEY (match_id) REFERENCES Matches(match_id) ON DELETE CASCADE,
            FOREIGN KEY (team_id) REFERENCES Teams(team_id) ON DELETE CASCADE
        );
        
        CREATE TABLE IF NOT EXISTS MatchEvents (
            event_id INTEGER PRIMARY KEY AUTOINCREMENT,
            match_id INTEGER NOT NULL,
            player_id INTEGER NOT NULL,
            event_type TEXT NOT NULL,
            minute INTEGER,
            assisted_by INTEGER,
            FOREIGN KEY (match_id) REFERENCES Matches(match_id) ON DELETE CASCADE,
            FOREIGN KEY (player_id) REFERENCES Players(player_id) ON DELETE CASCADE,
            FOREIGN KEY (assisted_by) REFERENCES Players(player_id) ON DELETE CASCADE
        );
        
        CREATE TABLE IF NOT EXISTS CompetitionLeaderboards (
            leaderboard_id INTEGER PRIMARY KEY AUTOINCREMENT,
            competition_id INTEGER NOT NULL,
            player_name TEXT NOT NULL,
            team_name TEXT NOT NULL,
            category TEXT NOT NULL,
            value INTEGER NOT NULL,
            last_updated TEXT NOT NULL,
            FOREIGN KEY (competition_id) REFERENCES Competitions(competition_id) ON DELETE CASCADE
        );
    `);

    console.log('Tables created successfully');       
}

module.exports = { createTables };