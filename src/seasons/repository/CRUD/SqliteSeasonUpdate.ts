import {SqliteBaseClass} from '../../../database/SqliteBaseClass';
import {Injectable} from '@nestjs/common';
import {UpdateSeasonDAO} from '../../../../core/Season/Model/DAO/UpdateSeasonDAO';
import {Season} from '../../../../core/Season/Model/Season';

@Injectable()
export class SqliteSeasonUpdate
  extends SqliteBaseClass
  implements UpdateSeasonDAO
{
  async update(season: Season): Promise<void> {
    const stmt = this.getDb().prepare(`
            UPDATE Seasons
            SET name = @name
            WHERE id = @id
        `);
    stmt.run({
      id: season.id.value,
      name: season.name.getValue(),
    });
  }
}
