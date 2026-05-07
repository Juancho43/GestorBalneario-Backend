import {SqliteBaseClass} from '../../database/SqliteBaseClass';
import {ClientSearcherDAO} from '../../../core/Client/Application/Interfaces/ClientSearcherDAO';
import {Injectable} from '@nestjs/common';
import {ClientResponse} from 'core/Client/Application/DTO/ClientResponse';
import {ClientSearchQuery} from 'core/Client/Application/Queries/ClientSearchQuery';

@Injectable()
export class SqliteClientSearch
  extends SqliteBaseClass
  implements ClientSearcherDAO
{
  async search(query: ClientSearchQuery): Promise<ClientResponse[]> {
    const stmt = this.getDb().prepare(`
            SELECT id, name, email, phone 
            FROM Clients
            WHERE
                (name LIKE  '%' || @query || '%'  OR
                 email LIKE '%' || @query || '%' OR
                 phone LIKE '%' || @query || '%')
              AND deleted_at IS NULL
            ORDER BY name
            LIMIT @limit OFFSET @page
        `);

    const results = stmt.all({
      query: query.query,
      limit: query.pageSize,
      page: query.page,
    }) as any[];
    const dto: ClientResponse[] = [];
    results.forEach((result) => {
      const client = new ClientResponse();
      client.id = result.id;
      client.name = result.name;
      client.email = result.email;
      client.phone = result.phone;
      dto.push(client);
    });
    return dto;
  }
}
