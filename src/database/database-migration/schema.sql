-- Estructura para gestión de reservas de playa (SQLite)

CREATE TABLE IF NOT EXISTS `Shadows`(
    `id` VARCHAR(255) NOT NULL PRIMARY KEY,
    `identifier` VARCHAR(255) NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `state` VARCHAR(255) NOT NULL,
    `x` FLOAT NOT NULL,
    `y` FLOAT NOT NULL
);

CREATE TABLE IF NOT EXISTS `Clients`(
    `id` VARCHAR(255) NOT NULL PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS `Reservations`(
    `id` VARCHAR(255) NOT NULL PRIMARY KEY,
    `clientId` VARCHAR(255) NOT NULL,
    `shadowId` VARCHAR(255) NOT NULL,
    `checkIn` DATETIME NOT NULL,
    `checkOut` DATETIME NOT NULL,
    `date` DATETIME NOT NULL,
    FOREIGN KEY(`clientId`) REFERENCES `Clients`(`id`),
    FOREIGN KEY(`shadowId`) REFERENCES `Shadows`(`id`)
);

CREATE TABLE IF NOT EXISTS `Holidays`(
    `id` VARCHAR(255) NOT NULL PRIMARY KEY,
    `startDate` DATE NOT NULL,
    `endDate` DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS `Payments`(
    `id` VARCHAR(255) NOT NULL PRIMARY KEY,
    `amount` FLOAT NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `date` DATETIME NOT NULL,
    `description` VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS `Holiday_Shadows`(
    `id` VARCHAR(255) NOT NULL PRIMARY KEY,
    `shadowId` VARCHAR(255) NOT NULL,
    `holidayId` VARCHAR(255) NOT NULL,
    FOREIGN KEY(`shadowId`) REFERENCES `Shadows`(`id`),
    FOREIGN KEY(`holidayId`) REFERENCES `Holidays`(`id`)
);

CREATE TABLE IF NOT EXISTS `Reservation_Payments`(
    `id` VARCHAR(255) NOT NULL PRIMARY KEY,
    `reservationId` VARCHAR(255) NOT NULL,
    `paymentId` VARCHAR(255) NOT NULL,
    FOREIGN KEY(`reservationId`) REFERENCES `Reservations`(`id`),
    FOREIGN KEY(`paymentId`) REFERENCES `Payments`(`id`)
);

-- Índices para optimización de consultas frecuentes
CREATE INDEX IF NOT EXISTS `shadows_identifier_index` ON `Shadows`(`identifier`);
CREATE INDEX IF NOT EXISTS `shadows_state_index` ON `Shadows`(`state`);
CREATE INDEX IF NOT EXISTS `reservations_date_index` ON `Reservations`(`date`);
CREATE INDEX IF NOT EXISTS `payments_date_index` ON `Payments`(`date`);
