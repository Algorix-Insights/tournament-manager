-- Add the uniqueness constraint without changing existing player data.
-- Rollback: ALTER TABLE `players` DROP INDEX `players_email_key`;
-- Deployment fails if existing players contain duplicate emails so they can be reviewed first.
ALTER TABLE `players`
ADD UNIQUE INDEX `players_email_key`(`email`);
