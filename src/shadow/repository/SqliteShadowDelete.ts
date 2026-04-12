import { DeleteShadowDAO } from '../../../core/Shadow/Model/DAO/DeleteShadowDAO';
import { Injectable } from '@nestjs/common';
import { SqliteBaseClass } from '../../database/SqliteBaseClass';
import { Shadow } from '../../../core/Shadow/Model/Shadow';
@Injectable()
export class SqliteShadowDelete
  extends SqliteBaseClass
  implements DeleteShadowDAO
{
  async delete(shadow: Shadow): Promise<void> {
    const sql = `UPDATE Shadows SET deleted_at = @date WHERE id = @id`;
    this.getDb().prepare(sql).run({
      date: shadow.getSoftDelete().value!.toISOString(),
      id: shadow.getId().value,
    });
  }
}
