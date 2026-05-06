import {Client} from '../../../core/Client/Model/Client';
import {GetClientsDAO} from '../../../core/Client/Model/DAO/GetClientsDAO';
import {GetClientsQuery} from '../../../core/Client/Application/Queries/GetClientsQuery';
import {Injectable} from '@nestjs/common';
import {StringObject} from '../../../core/common/Model/StringObject';
import {EmailObject} from '../../../core/common/Model/EmailObject';
import {Timestamps} from '../../../core/common/Model/Timestamps';
import {SoftDelete} from '../../../core/common/Model/SoftDelete';
import {UUID} from '../../../core/common/Model/UUID';
import {SqliteBaseClass} from "../../database/SqliteBaseClass";

@Injectable()
export class SqliteClientGetMany extends SqliteBaseClass implements GetClientsDAO {
  async get(query: GetClientsQuery): Promise<Client[]> {
    const limit = query.pageSize;
    const offset = (query.page - 1) * limit;

    const rows = this.getDb()
      .prepare(
        `
                SELECT * FROM Clients 
                ORDER BY id 
                LIMIT ? OFFSET ?
            `,
      )
      .all(limit, offset) as any[];

    return rows.map((row) =>
      Client.create(
        UUID.restore(row.id),
        StringObject.create(row.name),
        EmailObject.create(row.email),
        StringObject.create(row.phone),
        Timestamps.restore(row.created_at, row.updated_at),
        SoftDelete.restore(row.deleted_at),
      ),
    );
  }
}
