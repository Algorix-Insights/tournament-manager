-- ============================================================
-- Video Game Tournament System - Database Schema
-- Engine: MySQL (Normalized 3NF / ACID with Genre Catalog)
-- ============================================================

CREATE DATABASE IF NOT EXISTS tournament_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE tournament_db;

-- ------------------------------------------------------------
-- Drop tables if they exist
-- ------------------------------------------------------------
DROP TABLE IF EXISTS scores;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS genres;
DROP TABLE IF EXISTS players;

-- ------------------------------------------------------------
-- Table: players (FR01)
-- ------------------------------------------------------------
CREATE TABLE players (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    gamertag VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Catalog Table: genres
-- ------------------------------------------------------------
CREATE TABLE genres (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Table: games (FR02)
-- ------------------------------------------------------------
CREATE TABLE games (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    genre_id INT NOT NULL,
    CONSTRAINT fk_games_genre FOREIGN KEY (genre_id) 
        REFERENCES genres(id) 
        ON DELETE RESTRICT 
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Table: scores (FR03)
-- ------------------------------------------------------------
CREATE TABLE scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_id INT NOT NULL,
    game_id INT NOT NULL,
    score INT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_score_positive CHECK (score >= 0),
    CONSTRAINT fk_scores_player FOREIGN KEY (player_id) 
        REFERENCES players(id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    CONSTRAINT fk_scores_game FOREIGN KEY (game_id) 
        REFERENCES games(id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
