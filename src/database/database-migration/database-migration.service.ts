import {Inject, Injectable, OnModuleInit} from '@nestjs/common';
import {DB_PROVIDER} from "../DBPROVIDER";

@Injectable()
export class DatabaseMigrationService implements OnModuleInit{
    constructor(@Inject(DB_PROVIDER) private readonly db: any) {}

    private sql =
        `
       -- 1. Crear tablas con seguridad
CREATE TABLE IF NOT EXISTS \`Shadows\`(
    \`id\` VARCHAR(255) PRIMARY KEY, -- En SQLite, usar PRIMARY KEY ya garantiza unicidad
    \`identifier\` VARCHAR(255) NOT NULL,
    \`type\` VARCHAR(255) NOT NULL,
    \`state\` VARCHAR(255) NOT NULL,
    \`x\` FLOAT NOT NULL,
    \`y\` FLOAT NOT NULL
);

-- SQLite crea los índices automáticamente si no existen si usas CREATE INDEX IF NOT EXISTS
CREATE INDEX IF NOT EXISTS \`shadows_identifier_index\` ON \`Shadows\`(\`identifier\`);
CREATE INDEX IF NOT EXISTS \`shadows_state_index\` ON \`Shadows\`(\`state\`);

CREATE TABLE IF NOT EXISTS \`Clients\`(
    \`id\` INTEGER PRIMARY KEY AUTOINCREMENT, -- SQLite usa AUTOINCREMENT
    \`name\` VARCHAR(255) NOT NULL,
    \`phone\` VARCHAR(255) NOT NULL,
    \`email\` VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS \`Reservations\`(
    \`id\` INTEGER PRIMARY KEY AUTOINCREMENT,
    \`clientId\` INTEGER NOT NULL,
    \`shadowId\` VARCHAR(255) NOT NULL,
    \`checkIn\` DATETIME NOT NULL,
    \`checkOut\` DATETIME NOT NULL,
    \`date\` DATETIME NOT NULL,
    FOREIGN KEY(\`clientId\`) REFERENCES \`Clients\`(\`id\`),
    FOREIGN KEY(\`shadowId\`) REFERENCES \`Shadows\`(\`id\`)
); 
        `
    onModuleInit() {
        this.db.exec(this.sql);
    }
}
