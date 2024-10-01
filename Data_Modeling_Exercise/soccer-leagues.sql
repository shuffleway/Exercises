DROP DATABASE IF EXISTS soccer-leagues.sql;

CREATE DATABASE soccer-leagues.sql;

\c soccer-leagues.sql

CREATE TABLE teams
(
  team_id SERIAL PRIMARY KEY,
  team_name TEXT NOT NULL,
  city TEXT NOT NULL,
  stadium_name TEXT
);

CREATE TABLE players
(
  player_id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  position TEXT NOT NULL,  -- e.g., Forward, Midfielder, Defender, Goalkeeper
  team_id INTEGER REFERENCES teams(team_id),
  jersey_number INTEGER
);

CREATE TABLE referees
(
  referee_id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  experience_level TEXT  -- e.g., National, International
);

CREATE TABLE seasons
(
  season_id SERIAL PRIMARY KEY,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  year INTEGER NOT NULL UNIQUE  -- e.g., 2024, 2025
);

CREATE TABLE matches
(
  match_id SERIAL PRIMARY KEY,
  home_team_id INTEGER REFERENCES teams(team_id),
  away_team_id INTEGER REFERENCES teams(team_id),
  match_date DATE NOT NULL,
  referee_id INTEGER REFERENCES referees(referee_id),
  season_id INTEGER REFERENCES seasons(season_id),
  home_team_score INTEGER DEFAULT 0,
  away_team_score INTEGER DEFAULT 0
);

CREATE TABLE goals
(
  goal_id SERIAL PRIMARY KEY,
  player_id INTEGER REFERENCES players(player_id),
  match_id INTEGER REFERENCES matches(match_id),
  goal_time INTEGER NOT NULL,  -- minute of the match when the goal was scored
  team_id INTEGER REFERENCES teams(team_id)  -- team that scored
);


INSERT INTO teams (team_name, city, stadium_name)
VALUES 
('San Francisco FC', 'San Francisco', 'SF Stadium'),
('Atlanta United', 'Atlanta', 'ATL Stadium'),
('Seattle Sounders', 'Seattle', 'Seattle Stadium');

INSERT INTO players (first_name, last_name, position, team_id, jersey_number)
VALUES 
('John', 'Doe', 'Forward', 1, 9),
('Mike', 'Smith', 'Midfielder', 2, 8),
('Alex', 'Johnson', 'Goalkeeper', 3, 1);

INSERT INTO referees (first_name, last_name, experience_level)
VALUES 
('Emily', 'Brown', 'National'),
('James', 'Williams', 'International');

INSERT INTO seasons (start_date, end_date, year)
VALUES 
('2024-03-01', '2024-11-30', 2024);

INSERT INTO matches (home_team_id, away_team_id, match_date, referee_id, season_id, home_team_score, away_team_score)
VALUES 
(1, 2, '2024-03-15', 1, 1, 2, 1),
(3, 1, '2024-03-22', 2, 1, 0, 3);

INSERT INTO goals (player_id, match_id, goal_time, team_id)
VALUES 
(1, 1, 45, 1),  -- Player 1 scored at 45th minute for Team 1 in Match 1
(2, 1, 60, 2),  -- Player 2 scored at 60th minute for Team 2 in Match 1
(1, 1, 75, 1);  -- Player 1 scored again at 75th minute for Team 1 in Match 1

SELECT 
  t.team_name,
  COUNT(CASE WHEN m.home_team_score > m.away_team_score AND m.home_team_id = t.team_id THEN 1 END) AS wins,
  COUNT(CASE WHEN m.home_team_score < m.away_team_score AND m.away_team_id = t.team_id THEN 1 END) AS losses,
  COUNT(CASE WHEN m.home_team_score = m.away_team_score THEN 1 END) AS draws,
  SUM(m.home_team_score) AS goals_scored,
  SUM(m.away_team_score) AS goals_conceded
FROM 
  teams t
LEFT JOIN 
  matches m ON (t.team_id = m.home_team_id OR t.team_id = m.away_team_id)
GROUP BY 
  t.team_name;

