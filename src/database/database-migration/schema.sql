-- Habilitar soporte de llaves foráneas en la sesión
PRAGMA foreign_keys = ON;

-- 1. Tabla Shadows
CREATE TABLE IF NOT EXISTS `Shadows`(
                          `id` TEXT NOT NULL PRIMARY KEY,
                          `identifier` TEXT NOT NULL,
                          `type` TEXT NOT NULL,
                          `x` REAL NOT NULL,
                          `y` REAL NOT NULL,
                          `created_at` TEXT NOT NULL,
                          `updated_at` TEXT NOT NULL,
                          `deleted_at` TEXT NULL
);
CREATE INDEX IF NOT EXISTS`shadows_identifier_index` ON `Shadows`(`identifier`);

-- 2. Tabla Clients
CREATE TABLE IF NOT EXISTS `Clients`(
                          `id` TEXT NOT NULL PRIMARY KEY,
                          `name` TEXT NOT NULL,
                          `phone` TEXT NULL,
                          `email` TEXT UNIQUE NULL,
                          `created_at` TEXT NOT NULL,
                          `updated_at` TEXT NOT NULL,
                          `deleted_at` TEXT NULL
);

-- 3. Tabla Seasons
CREATE TABLE IF NOT EXISTS `Seasons`(
                          `id` TEXT NOT NULL PRIMARY KEY,
                          `startDate` TEXT NOT NULL,
                          `endDate` TEXT NOT NULL,
                          `created_at` TEXT NOT NULL,
                          `updated_at` TEXT NOT NULL,
                          `deleted_at` TEXT NULL
);

-- 4. Tabla Reservations
CREATE TABLE IF NOT EXISTS `Reservations`(
                               `id` TEXT NOT NULL PRIMARY KEY,
                               `clientId` TEXT NOT NULL,
                               `shadowId` TEXT NOT NULL,
                               `checkIn` TEXT NOT NULL,
                               `checkOut` TEXT NOT NULL,
                               `date` TEXT NOT NULL,
                               `created_at` TEXT NOT NULL,
                               `updated_at` TEXT NOT NULL,
                               `deleted_at` TEXT NULL,
                               FOREIGN KEY(`clientId`) REFERENCES `Clients`(`id`),
                               FOREIGN KEY(`shadowId`) REFERENCES `Shadows`(`id`)
);
CREATE INDEX IF NOT EXISTS `reservations_date_index` ON `Reservations`(`date`);
CREATE INDEX IF NOT EXISTS`reservations_clientid_index` ON `Reservations`(`clientId`);
CREATE INDEX IF NOT EXISTS`reservations_shadowid_index` ON `Reservations`(`shadowId`);

-- 5. Tabla Payments
CREATE TABLE IF NOT EXISTS `Payments`(
                           `id` TEXT NOT NULL PRIMARY KEY,
                           `date` TEXT NOT NULL,
                           `type` TEXT NOT NULL,
                           `amount` REAL NOT NULL,
                           `changeType` INTEGER NOT NULL,
                           `finalAmount` REAL NOT NULL,
                           `description` TEXT NULL,
                           `created_at` TEXT NOT NULL,
                           `updated_at` TEXT NOT NULL,
                           `deleted_at` TEXT NULL
);
CREATE INDEX IF NOT EXISTS `payments_date_index` ON `Payments`(`date`);

-- 6. Tabla Holiday_Shadows
CREATE TABLE IF NOT EXISTS `Holiday_Shadows`(
                                  `id` TEXT NOT NULL PRIMARY KEY,
                                  `shadowId` TEXT NOT NULL UNIQUE,
                                  `seasonId` TEXT NOT NULL,
                                  FOREIGN KEY(`seasonId`) REFERENCES `Seasons`(`id`),
                                  FOREIGN KEY(`shadowId`) REFERENCES `Shadows`(`id`)
);

-- 7. Tabla Invoices
CREATE TABLE IF NOT EXISTS `Invoices`(
                             `id` TEXT NOT NULL PRIMARY KEY,
                           `date` TEXT NOT NULL,
                           `clientId` TEXT NOT NULL,
                           `amount` REAL NOT NULL, -- SQLite no tiene DECIMAL nativo, se usa REAL o INTEGER
                           `created_at` TEXT NOT NULL,
                           `updated_at` TEXT NOT NULL,
                           `deleted_at` TEXT NULL,
                           FOREIGN KEY(`clientId`) REFERENCES `Clients`(`id`)
);

-- 8. Tabla Invoice_Payments
CREATE TABLE IF NOT EXISTS `Invoice_Payments`(
                                   `id` TEXT NOT NULL PRIMARY KEY,
                                   `invoiceId` INTEGER NOT NULL,
                                   `paymentId` TEXT NOT NULL UNIQUE,
                                   FOREIGN KEY(`paymentId`) REFERENCES `Payments`(`id`),
                                   FOREIGN KEY(`invoiceId`) REFERENCES `Invoices`(`id`)
);

-- 9. Tabla Services
CREATE TABLE IF NOT EXISTS `Services`(
                                         `id` TEXT NOT NULL PRIMARY KEY,
                           `description` TEXT NOT NULL,
                           `price` INTEGER NOT NULL,
                           `created_at` TEXT NOT NULL,
                           `updated_at` TEXT NOT NULL,
                           `deleted_at` TEXT NULL
);

-- 10. Tabla Reservation_Service
CREATE TABLE IF NOT EXISTS `Reservation_Service`(
                                        `id` TEXT NOT NULL PRIMARY KEY,
                                      `invoiceId` INTEGER NOT NULL,
                                      `reservationId` TEXT NOT NULL,
                                      `serviceId` INTEGER NOT NULL,
                                      `price` INTEGER NOT NULL,
                                      FOREIGN KEY(`serviceId`) REFERENCES `Services`(`id`),
                                      FOREIGN KEY(`reservationId`) REFERENCES `Reservations`(`id`),
                                      FOREIGN KEY(`invoiceId`) REFERENCES `Invoices`(`id`)
);