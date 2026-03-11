import { Module, Global } from '@nestjs/common';
import Database from 'better-sqlite3';
import {DatabaseMigrationService} from "./database-migration/database-migration.service";
import {DB_PROVIDER} from "./DBPROVIDER";


@Global()
@Module({
    providers: [
        DatabaseMigrationService,
        {
        provide: DB_PROVIDER,
        useFactory: () => {
            const db = new Database('my_app.db');
            db.pragma('journal_mode = WAL'); // Rendimiento optimizado
            return db;
        },
    }],
    exports: [DB_PROVIDER],
})
export class DatabaseModule {}
