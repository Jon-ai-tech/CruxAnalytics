CREATE TABLE `device_usage` (
	`deviceId` varchar(128) NOT NULL,
	`usageCount` int NOT NULL DEFAULT 0,
	`lastUsedAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `device_usage_deviceId` PRIMARY KEY(`deviceId`)
);
