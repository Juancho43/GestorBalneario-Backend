import {SaveClientDAO} from '../../../../core/Client/Model/DAO/SaveClientDAO';
import {Client} from '../../../../core/Client/Model/Client';
import {Injectable} from '@nestjs/common';
import {SqliteBaseClass} from '../../../database/SqliteBaseClass';

@Injectable()
export class SqliteClientCreate
  extends SqliteBaseClass
  implements SaveClientDAO
{
  async save(client: Client): Promise<void> {
    const stmt = this.getDb().prepare(
      `INSERT OR REPLACE INTO Clients (id, name, email, phone, created_at, updated_at) 
         VALUES (:id, :name, :email, :phone, :createdAt, :updatedAt)`,
    );

    stmt.run({
      id: client.id.value,
      name: client.name.getValue(),
      email: client.email.getValue(),
      phone: client.phone.getValue(),
      createdAt: client.timestamp.createdAt.toISOString(),
      updatedAt: client.timestamp.updatedAt.toISOString(),
    });
  }
}
