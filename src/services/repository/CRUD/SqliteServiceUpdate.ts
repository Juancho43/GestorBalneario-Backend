import {SqliteBaseClass} from '../../../database/SqliteBaseClass';
import {Injectable} from '@nestjs/common';
import {UpdateServiceDAO} from '../../../../core/Service/Model/DAO/UpdateServiceDAO';
import {Service} from '../../../../core/Service/Model/Service';

@Injectable()
export class SqliteServiceUpdate
  extends SqliteBaseClass
  implements UpdateServiceDAO
{
  async update(service: Service): Promise<void> {
    const stmt = this.getDb().prepare(`
            UPDATE Services
            SET description = @description,
                price = @price,
              type = @type
            WHERE id = @id
        `);
    stmt.run({
      id: service.id.value,
      description: service.name.getValue(),
      price: service.price.finalAmount,
      type: service.type.getValue(),
    });
  }
}
