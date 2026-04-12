import { SqliteBaseClass } from '../../database/SqliteBaseClass';
import { GetServiceDAO } from '../../../core/Service/Model/DAO/GetServiceDAO';
import { Injectable } from '@nestjs/common';
import { Service } from '../../../core/Service/Model/Service';
import { UUID } from '../../../core/common/Model/UUID';
import { Timestamps } from '../../../core/common/Model/Timestamps';
import { SoftDelete } from '../../../core/common/Model/SoftDelete';
import { StringObject } from '../../../core/common/Model/StringObject';
import { Money } from '../../../core/Payment/Model/Money';

@Injectable()
export class SqliteGetService extends SqliteBaseClass implements GetServiceDAO {
  async get(id: string): Promise<Service | null> {
    const sql = `
            SELECT 
                s.id,
                s.description,
                s.price,
                s.created_at,
                s.updated_at,
                ss.seasonId AS seasonId
                FROM Services s
                INNER JOIN Season_Services ss ON ss.serviceId = s.id   
                WHERE s.id = @id AND deleted_at IS NULL `;
    const stmt = this.getDb().prepare(sql);
    const result = stmt.get({ id: id }) as any;
    let data: Service | null = null;
    if (result) {
      data = Service.create(
        UUID.restore(result.id),
        UUID.restore(result.seasonId),
        StringObject.create(result.description),
        Money.create(result.price),
        Timestamps.restore(
          new Date(result.created_at),
          new Date(result.updated_at),
        ),
        SoftDelete.empty(),
      );
    }
    return data;
  }
}
