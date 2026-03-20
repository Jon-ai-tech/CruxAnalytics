-- Migration: Add ai_analysis_logs table
-- Purpose: Store AI reasoning logs with micro-feedback for Jon's review
-- Retention policy: recent (0-90d) | summary (91-365d) | archived (>1y)

CREATE TABLE IF NOT EXISTS `ai_analysis_logs` (
  `id`              VARCHAR(36)                                       NOT NULL,
  `project_id`      VARCHAR(36)                                       NOT NULL,
  `user_id`         INT                                               NOT NULL,
  `prompt`          TEXT                                              NOT NULL,
  `response`        TEXT                                              NOT NULL,
  `conclusions`     JSON                                              NULL,
  `feedback`        ENUM('pending','validated','rejected')            NOT NULL DEFAULT 'pending',
  `feedback_note`   TEXT                                              NULL,
  `visible_to_jon`  TINYINT(1)                                        NOT NULL DEFAULT 1,
  `retention_tier`  ENUM('recent','summary','archived')               NOT NULL DEFAULT 'recent',
  `created_at`      TIMESTAMP                                         DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),
  INDEX `al_project_id_idx` (`project_id`),
  INDEX `al_user_id_idx`    (`user_id`),
  INDEX `al_feedback_idx`   (`feedback`),
  INDEX `al_created_at_idx` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
