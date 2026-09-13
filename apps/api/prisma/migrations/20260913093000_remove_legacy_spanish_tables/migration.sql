-- Remove the legacy Spanish tables after the data backfill was verified.
-- This is intentionally destructive; the previous migration preserved the data
-- in the English tables and a logical backup is created before deployment.

DROP TABLE IF EXISTS `puntuaciones`;
DROP TABLE IF EXISTS `videojuegos`;
DROP TABLE IF EXISTS `generos`;
DROP TABLE IF EXISTS `jugadores`;
