ALTER TABLE `users` ADD `subscriptionTier` enum('free','premium') DEFAULT 'free' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `subscriptionExpiry` timestamp;--> statement-breakpoint
ALTER TABLE `users` ADD `revenueCatUserId` varchar(128);--> statement-breakpoint
ALTER TABLE `users` ADD `aiAnalysisCount` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `aiAnalysisResetDate` timestamp DEFAULT (now()) NOT NULL;