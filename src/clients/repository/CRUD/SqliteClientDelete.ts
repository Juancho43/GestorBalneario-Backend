import {DeleteClientDAO} from '../../../../core/Client/Model/DAO/DeleteClientDAO';
import {Injectable} from '@nestjs/common';
import {Client} from '../../../../core/Client/Model/Client';
import {SqliteBaseClass} from '../../../database/SqliteBaseClass';

@Injectable()
export class SqliteClientDelete
  extends SqliteBaseClass
  implements DeleteClientDAO
{
  async delete(client: Client): Promise<void> {
    const sql = `UPDATE Clients SET deleted_at = @date WHERE id = @id`;
    this.getDb().prepare(sql).run({
      date: client.getSoftDelete().value!.toISOString(),
      id: client.getId().value,
    });
  }
}
