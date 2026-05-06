import {SqliteBaseClass} from './SqliteBaseClass';
import {Entity} from '../../core/common/Model/Entity';
import {Inject} from '@nestjs/common';
import {DB_PROVIDER} from './DBPROVIDER';
import Database from 'better-sqlite3';

export class SoftDeleteRepository<T extends Entity> extends SqliteBaseClass {
  constructor(
    @Inject(DB_PROVIDER) db: Database.Database,
    private readonly tableName: string,
  ) {
    super(db);
  }

  /**
   * Realiza el borrado lógico actualizando la columna deletedAt
   */
  async softDelete(entity: T): Promise<void> {
    const query = `
            UPDATE ${this.tableName} 
            SET deletedAt = ? 
            WHERE id = ? AND deletedAt IS NULL
        `;

    this.getDb()
      .prepare(query)
      .run([entity.getSoftDelete().value!.toISOString(), entity.getId().value]);
  }

  /**
   * Restaura un registro borrado
   */
  async restore(id: string): Promise<void> {
    const query = `
            UPDATE ${this.tableName} 
            SET deletedAt = NULL 
            WHERE id = ?
        `;
    this.getDb().prepare(query).run(id);
  }
}
