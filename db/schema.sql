-- ============================================================
-- Sistema de Torneo de Videojuegos - Esquema de Base de Datos
-- Motor: MySQL (Normalizado 3NF / ACID con Catálogo de Géneros)
-- ============================================================

CREATE DATABASE IF NOT EXISTS torneo_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE torneo_db;

-- ------------------------------------------------------------
-- Eliminar tablas si existen
-- ------------------------------------------------------------
DROP TABLE IF EXISTS puntuaciones;
DROP TABLE IF EXISTS videojuegos;
DROP TABLE IF EXISTS generos;
DROP TABLE IF EXISTS jugadores;

-- ------------------------------------------------------------
-- Tabla: jugadores (RF01)
-- ------------------------------------------------------------
CREATE TABLE jugadores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    gamertag VARCHAR(50) NOT NULL UNIQUE,
    correo VARCHAR(100) NOT NULL,
    fecha_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Tabla Catálogo: generos
-- ------------------------------------------------------------
CREATE TABLE generos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Tabla: videojuegos (RF02)
-- ------------------------------------------------------------
CREATE TABLE videojuegos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    genero_id INT NOT NULL,
    CONSTRAINT fk_videojuegos_genero FOREIGN KEY (genero_id) 
        REFERENCES generos(id) 
        ON DELETE RESTRICT 
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Tabla: puntuaciones (RF03)
-- ------------------------------------------------------------
CREATE TABLE puntuaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    jugador_id INT NOT NULL,
    videojuego_id INT NOT NULL,
    puntuacion INT NOT NULL,
    fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_puntuacion_positiva CHECK (puntuacion >= 0),
    CONSTRAINT fk_puntuaciones_jugador FOREIGN KEY (jugador_id) 
        REFERENCES jugadores(id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    CONSTRAINT fk_puntuaciones_videojuego FOREIGN KEY (videojuego_id) 
        REFERENCES videojuegos(id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
