-- Habilitar soporte para claves foráneas en SQLite
PRAGMA foreign_keys = ON;

-- Tabla de Sombras (Carpas/Sombrillas)
CREATE TABLE IF NOT EXISTS `Shadows` (
     `id` TEXT NOT NULL,
     `identifier` TEXT NOT NULL,
     `type` TEXT NOT NULL,
     `x` REAL NOT NULL,
     `y` REAL NOT NULL,
     `created_at` DATETIME NOT NULL,
     `updated_at` DATETIME NOT NULL,
     `deleted_at` DATETIME NULL,
 PRIMARY KEY(`id`)
);

CREATE INDEX IF NOT EXISTS `shadows_identifier_index` ON `Shadows` (`identifier`);

-- Tabla de Clientes
CREATE TABLE IF NOT EXISTS `Clients` (
     `id` TEXT NOT NULL,
     `name` TEXT NOT NULL,
     `phone` TEXT NULL,
     `email` TEXT NULL,
     `created_at` DATETIME NOT NULL,
     `updated_at` DATETIME NOT NULL,
     `deleted_at` DATETIME NULL,
     PRIMARY KEY(`id`),
     UNIQUE(`email`)
);

-- Tabla de Reservas
CREATE TABLE IF NOT EXISTS `Reservations` (
      `id` TEXT NOT NULL,
      `clientId` TEXT NOT NULL,
      `shadowId` TEXT NOT NULL,
      `checkIn` DATETIME NOT NULL,
      `checkOut` DATETIME NOT NULL,
      `date` DATETIME NOT NULL,
      `price` REAL NOT NULL,
      `created_at` DATETIME NOT NULL,
      `updated_at` DATETIME NOT NULL,
      `deleted_at` DATETIME NULL,
      PRIMARY KEY(`id`),
      FOREIGN KEY(`clientId`) REFERENCES `Clients`(`id`),
      FOREIGN KEY(`shadowId`) REFERENCES `Shadows`(`id`)
);

CREATE INDEX IF NOT EXISTS `reservations_date_index` ON `Reservations` (`date`);
CREATE INDEX IF NOT EXISTS `reservations_clientid_index` ON `Reservations` (`clientId`);
CREATE INDEX IF NOT EXISTS `reservations_shadowid_index` ON `Reservations` (`shadowId`);

-- Tabla de Feriados/Temporadas
CREATE TABLE IF NOT EXISTS `Holidays` (
  `id` TEXT NOT NULL,
  `startDate` DATE NOT NULL,
  `endDate` DATE NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY(`id`)
);

-- Tabla de Pagos
CREATE TABLE IF NOT EXISTS `Payments` (
  `id` TEXT NOT NULL,
  `date` DATETIME NOT NULL,
  `type` TEXT NOT NULL,
  `amount` REAL NOT NULL,
  `changeType` INTEGER NOT NULL,
  `finalAmount` REAL NOT NULL,
  `description` TEXT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY(`id`)
);

CREATE INDEX IF NOT EXISTS `payments_date_index` ON `Payments` (`date`);

-- Relación Feriados y Sombras
CREATE TABLE IF NOT EXISTS `Holiday_Shadows` (
    `id` TEXT NOT NULL,
    `shadowId` TEXT NOT NULL,
    `holidayId` TEXT NOT NULL,
    PRIMARY KEY(`id`),
    UNIQUE(`shadowId`),
    FOREIGN KEY(`holidayId`) REFERENCES `Holidays`(`id`),
    FOREIGN KEY(`shadowId`) REFERENCES `Shadows`(`id`)
);

-- Relación Reservas y Pagos
CREATE TABLE IF NOT EXISTS `Reservation_Payments` (
  `id` TEXT NOT NULL,
  `reservationId` TEXT NOT NULL,
  `paymentId` TEXT NOT NULL,
  PRIMARY KEY(`id`),
  UNIQUE(`paymentId`),
  FOREIGN KEY(`reservationId`) REFERENCES `Reservations`(`id`),
  FOREIGN KEY(`paymentId`) REFERENCES `Payments`(`id`)
);