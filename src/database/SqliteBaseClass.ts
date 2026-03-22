import {DB_PROVIDER} from "./DBPROVIDER";
import {Inject} from "@nestjs/common";
import type {Database} from "better-sqlite3";

export class SqliteBaseClass {
    constructor(@Inject(DB_PROVIDER) private readonly db: Database) {
    }

    getDb():Database{
        return this.db;
    }
}