import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { DB_PROVIDER } from '../DBPROVIDER';
import * as fs from 'node:fs';
import path from 'node:path';

@Injectable()
export class DatabaseMigrationService implements OnModuleInit, OnModuleDestroy {
  private logger = new Logger(DatabaseMigrationService.name);
  constructor(@Inject(DB_PROVIDER) private readonly db: any) {}

  onModuleInit() {
    try {
      this.logger.debug('Database migration');
      const sql = fs.readFileSync(
        path.join(process.cwd(), 'src/database/database-migration/schema.sql'),
        'utf-8',
      );
      this.db.exec(sql);
    } catch (e) {
      this.logger.error(e);
    }
  }
  onModuleDestroy() {
    this.db.close();
  }
}
