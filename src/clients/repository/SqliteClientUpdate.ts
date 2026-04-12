import { Client } from '../../../core/Client/Model/Client';
import { UpdateClientDAO } from '../../../core/Client/Model/DAO/UpdateClientDAO';
import { Injectable } from '@nestjs/common';
import { SqliteBaseClass } from '../../database/SqliteBaseClass';
@Injectable()
export class SqliteClientUpdate
  extends SqliteBaseClass
  implements UpdateClientDAO
{
  async update(client: Client): Promise<void> {
    const stmt = this.getDb().prepare(`
      UPDATE Clients
      SET name = @name,
          email = @email,
          phone = @phone,
          updated_at = @updated_at
      WHERE id = @id
    `);

    stmt.run({
      id: client.getId().value,
      name: client.name.getValue(),
      email: client.email.getValue(),
      phone: client.phone.getValue(),
      updated_at: client.getTimestamps().updatedAt.toISOString(),
    });
  }
}
