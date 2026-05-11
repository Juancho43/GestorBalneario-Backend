-- Habilitar soporte de llaves foráneas en la sesión
PRAGMA foreign_keys = ON;

-- 1. Tabla Shadows
CREATE TABLE IF NOT EXISTS `Shadows`(
                          `id` TEXT NOT NULL PRIMARY KEY,
                          `identifier` TEXT NOT NULL,
                          `type` TEXT NOT NULL,
                          `x` REAL NOT NULL,
                          `y` REAL NOT NULL,
                            `state` TEXT NOT NULL,
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
                            `name` TEXT NOT NULL,
                          `isActive` INTEGER NULL,
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

-- 6. Tabla Season_Shadows
CREATE TABLE IF NOT EXISTS `Season_Shadows`(
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
                                         `amount` REAL NOT NULL,
                                         `state` TEXT NOT NULL,
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
                            `type` TEXT NOT NULL,
                           `created_at` TEXT NOT NULL,
                           `updated_at` TEXT NOT NULL,
                           `deleted_at` TEXT NULL
);


-- 10. Tabla Reservation_Service

CREATE TABLE IF NOT EXISTS `Invoice_Items`(
                                              `id` TEXT NOT NULL PRIMARY KEY,
                                              `invoiceId` INTEGER NOT NULL,
                                              `aggregateId` TEXT NULL ,
                                              `aggregateType` TEXT NULL,
                                              `serviceId` TEXT NOT NULL,
                                              `price` INTEGER NOT NULL,
                                              `quantity` INTEGER NULL,
                                              FOREIGN KEY(`serviceId`) REFERENCES `Services`(`id`),
                                              FOREIGN KEY(`invoiceId`) REFERENCES `Invoices`(`id`)
);
-- 11. Tabla Seasons_Services
CREATE TABLE IF NOT EXISTS `Season_Services`(
                                               `id` TEXT NOT NULL PRIMARY KEY,
                                               `serviceId` TEXT NOT NULL UNIQUE,
                                               `seasonId` TEXT NOT NULL,
                                               FOREIGN KEY(`seasonId`) REFERENCES `Seasons`(`id`),
                                               FOREIGN KEY(`serviceId`) REFERENCES `Services`(`id`)
);
