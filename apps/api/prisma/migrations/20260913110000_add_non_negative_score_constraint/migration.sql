ALTER TABLE `scores`
ADD CONSTRAINT `scores_score_non_negative` CHECK (`score` >= 0);
