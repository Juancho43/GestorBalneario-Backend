import { SqliteBaseClass } from '../../database/SqliteBaseClass';
import { CreateShadowDAO } from '../../../core/Shadow/Model/DAO/CreateShadowDAO';
import { Shadow } from '../../../core/Shadow/Model/Shadow';
import { Injectable } from '@nestjs/common';
import { UUID } from '../../../core/common/Model/UUID';
@Injectable()
export class SqliteShadowCreate
  extends SqliteBaseClass
  implements CreateShadowDAO
{
  async save(shadow: Shadow): Promise<void> {
    const stmtShadowSeason = this.getDb().prepare(`
            INSERT INTO Season_Shadows (id, seasonId, shadowId) values (@id, @seasonId, @shadowId)
        `);
    const stmtShadow = this.getDb().prepare(
      `INSERT OR REPLACE INTO Shadows (id, identifier, state,type, x, y,created_at,updated_at)
             VALUES (@id, @identifier, @type,@state, @x, @y, @created_at, @updated_at)`,
    );
    const transaction = this.getDb().transaction(() => {
      stmtShadow.run({
        id: shadow.id.value,
        identifier: shadow.identifier.getValue(),
        type: shadow.type.type,
        state: shadow.state.toString(),
        x: shadow.coords.getX(),
        y: shadow.coords.getY(),
        created_at: shadow.timestamp.createdAt.toISOString(),
        updated_at: shadow.timestamp.updatedAt.toISOString(),
      });
      stmtShadowSeason.run({
        id: UUID.create().value,
        seasonId: shadow.season.value,
        shadowId: shadow.id.value,
      });
    });
    transaction();
  }
}
