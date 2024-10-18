CREATE TABLE IF NOT EXISTS `events` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(255) DEFAULT NULL,
    `date_creation` datetime DEFAULT NULL,
    `date_debut` datetime DEFAULT NULL,
    `date_fin` datetime DEFAULT NULL,
    `personnes_max` int DEFAULT NULL,
    `lieu` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `inscriptions` (
    `id` int NOT NULL AUTO_INCREMENT,
    `event_id` int DEFAULT NULL,
    `name` varchar(255) DEFAULT NULL,
    `lastName` varchar(255) DEFAULT NULL,
    `date_inscription` date DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `event_id` (`event_id`),
    CONSTRAINT `inscriptions_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=175 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
