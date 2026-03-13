import {Inject, Injectable, OnModuleInit} from '@nestjs/common';
import {DB_PROVIDER} from "../DBPROVIDER";
import * as fs from "node:fs";
import path from "node:path";

@Injectable()
export class DatabaseMigrationService implements OnModuleInit{
    constructor(@Inject(DB_PROVIDER) private readonly db: any) {}

    onModuleInit() {
        const sql = fs.readFileSync(path.join(process.cwd(), 'src/database/database-migration/schema.sql'), 'utf-8');
        this.db.exec(sql);
    }
}
