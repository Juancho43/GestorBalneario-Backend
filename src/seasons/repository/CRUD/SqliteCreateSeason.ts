import {Injectable} from '@nestjs/common';
import {SqliteBaseClass} from '../../../database/SqliteBaseClass';
import {CreateSeasonDAO} from '../../../../core/Season/Model/DAO/CreateSeasonDAO';
import {Season} from 'core/Season/Model/Season';

@Injectable()
export class SqliteCreateSeason
  extends SqliteBaseClass
  implements CreateSeasonDAO
{
  async save(season: Season): Promise<void> {
    const sql = `
        INSERT INTO Seasons (id,startDate,endDate,name,isActive,created_at,updated_at)
            VALUES (:id, :startDate, :endDate, :name, :isActive, :createdAt, :updatedAt)
    `;
    const stmt = this.getDb().prepare(sql);
    stmt.run({
      id: season.id.value,
      startDate: season.startDate.toISOString(),
      endDate: season.endDate.toISOString(),
      name: season.name.getValue(),
      isActive: season.isActive ? 1 : 0,
      createdAt: season.timestamps.createdAt.toISOString(),
      updatedAt: season.timestamps.updatedAt.toISOString(),
    });
  }
}
