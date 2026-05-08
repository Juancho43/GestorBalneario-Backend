import {Injectable} from '@nestjs/common';
import {SeasonServiceDAO} from '../../../core/Service/Application/Interfaces/SeasonServiceDAO';
import {SqliteBaseClass} from '../../database/SqliteBaseClass';
import {SeasonServiceDTO} from 'core/Service/Application/DTO/SeasonServiceDTO';
import {GetSeasonEntityQuery} from 'core/Service/Application/Queries/GetSeasonEntityQuery';
import {ServiceResponse} from '../../../core/Service/Application/DTO/ServiceResponse';

@Injectable()
export class SqliteSeasonsServices
  extends SqliteBaseClass
  implements SeasonServiceDAO
{
  async get(query: GetSeasonEntityQuery): Promise<SeasonServiceDTO> {
    const sql = `
            SELECT
                s.id as serviceId,
                s.price as servicePrice,
                s.description as serviceDescription
            FROM Services s
                     INNER JOIN Season_Services ss ON ss.serviceId = s.id
            WHERE ss.seasonId = @seasonId AND deleted_at IS NULL 
            LIMIT @limit OFFSET @offset
        `;
    const results = this.getDb().prepare(sql).all({
      seasonId: query.seasonId,
      limit: query.pageSize,
      offset: query.page,
    }) as any[];

    const response = new SeasonServiceDTO([]);
    results.forEach((result) => {
      const service = new ServiceResponse();
      service.id = result.serviceId;
      service.name = result.serviceDescription;
      service.price = result.servicePrice;
      response.services.push(service);
    });
    return response;
  }
}
