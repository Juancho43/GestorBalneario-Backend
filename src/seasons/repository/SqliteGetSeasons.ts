import { Injectable } from '@nestjs/common';
import { SqliteBaseClass } from '../../database/SqliteBaseClass';
import { Season } from '../../../core/Season/Model/Season';
import { UUID } from '../../../core/common/Model/UUID';
import { GetSeasonsDAO } from '../../../core/Season/Model/DAO/GetSeasonsDAO';
import { SoftDelete } from '../../../core/common/Model/SoftDelete';
import { Timestamps } from '../../../core/common/Model/Timestamps';
import { StringObject } from '../../../core/common/Model/StringObject';

@Injectable()
export class SqliteGetSeasons extends SqliteBaseClass implements GetSeasonsDAO {
  async get(): Promise<Season[]> {
    const sql = `SELECT *
                     FROM Seasons
                     WHERE deleted_at IS NULL
                     ORDER BY created_at DESC
                     LIMIT @limit OFFSET @offset
        `;
    const stmt = this.getDb().prepare(sql);
    const result = stmt.all({ limit: 10, offset: 0 }) as any;
    const seasons: Season[] = [];
    if (result) {
      result.forEach((row) => {
        const season = Season.create(
          UUID.restore(row.id),
          row.isActive === 1,
          new Date(row.startDate),
          new Date(row.endDate),
          StringObject.create(row.name),
          Timestamps.restore(
            new Date(row.created_at),
            new Date(row.updated_at),
          ),
          SoftDelete.empty(),
        );
        seasons.push(season);
      });
    }
    return seasons;
  }
}
