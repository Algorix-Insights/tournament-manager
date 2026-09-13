-- Migrate data from the legacy Spanish tables into the English schema.
-- Keep the legacy tables until a later, explicitly authorized cleanup migration.
-- The target tables are empty in production and source relationships were verified.

INSERT INTO `genres` (`id`, `name`)
SELECT `id`, `nombre`
FROM `generos`
ON DUPLICATE KEY UPDATE `id` = VALUES(`id`);

INSERT INTO `players` (`id`, `name`, `gamertag`, `email`, `created_at`)
SELECT `id`, `nombre`, `gamertag`, `correo`, `fecha_registro`
FROM `jugadores`
ON DUPLICATE KEY UPDATE `id` = VALUES(`id`);

INSERT INTO `games` (`id`, `name`, `genre_id`)
SELECT `id`, `nombre`, `genero_id`
FROM `videojuegos`
ON DUPLICATE KEY UPDATE `id` = VALUES(`id`);

INSERT INTO `scores` (`id`, `player_id`, `game_id`, `score`, `created_at`)
SELECT `id`, `jugador_id`, `videojuego_id`, `puntuacion`, `fecha`
FROM `puntuaciones`
ON DUPLICATE KEY UPDATE `id` = VALUES(`id`);
