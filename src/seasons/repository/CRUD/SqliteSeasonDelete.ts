import {Injectable} from '@nestjs/common';
import {DeleteSeasonDAO} from '../../../../core/Season/Model/DAO/DeleteSeasonDAO';
import {Season} from '../../../../core/Season/Model/Season';
import {SqliteBaseClass} from '../../../database/SqliteBaseClass';

@Injectable()
export class SqliteSeasonDelete
  extends SqliteBaseClass
  implements DeleteSeasonDAO
{
  async delete(entity: Season): Promise<void> {
    const sql = `UPDATE Seasons SET deleted_at = @date WHERE id = @id`;
    this.getDb().prepare(sql).run({
      date: entity.getSoftDelete().value!.toISOString(),
      id: entity.getId().value,
    });
  }
}
