import {Client} from '../../../../core/Client/Model/Client';
import {GetClientDAO} from '../../../../core/Client/Model/DAO/GetClientDAO';
import {Injectable} from '@nestjs/common';
import {StringObject} from '../../../../core/common/Model/StringObject';
import {EmailObject} from '../../../../core/common/Model/EmailObject';
import {Timestamps} from '../../../../core/common/Model/Timestamps';
import {SoftDelete} from '../../../../core/common/Model/SoftDelete';
import {SqliteBaseClass} from "../../../database/SqliteBaseClass";
import {UUID} from "../../../../core/common/Model/UUID";

@Injectable()
export class SqliteClientGetOne extends SqliteBaseClass implements GetClientDAO {
  async get(id: string): Promise<Client | null> {
    const row = this.getDb().prepare('SELECT * FROM Clients WHERE id = ?').get(id) as any;
    let result: Client | null = null;
    if (row) {
      result = Client.create(
          UUID.restore(row.id),
          StringObject.create(row.name),
          EmailObject.create(row.email),
          StringObject.create(row.phone),
          Timestamps.restore(row.created_at, row.updated_at),
          SoftDelete.restore(row.deleted_at),
      );
    }
    return result;
  }
}
