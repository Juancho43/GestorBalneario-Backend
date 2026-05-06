import {Injectable} from '@nestjs/common';
import {DeletePaymentDAO} from '../../../core/Payment/Model/DAO/DeletePaymentDAO';
import {Payment} from '../../../core/Payment/Model/Payment';
import {SqliteBaseClass} from '../../database/SqliteBaseClass';

@Injectable()
export class SqlitePaymentDelete
  extends SqliteBaseClass
  implements DeletePaymentDAO
{
  async delete(client: Payment): Promise<void> {
    const sql = `UPDATE Payments SET deleted_at = @date WHERE id = @id`;
    this.getDb().prepare(sql).run({
      date: client.getSoftDelete().value!.toISOString(),
      id: client.getId().value,
    });
  }
}
