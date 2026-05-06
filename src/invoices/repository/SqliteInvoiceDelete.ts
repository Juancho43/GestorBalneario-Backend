import {Injectable} from '@nestjs/common';
import {SqliteBaseClass} from '../../database/SqliteBaseClass';
import {DeleteInvoiceDAO} from '../../../core/Invoice/Model/DAO/DeleteInvoiceDAO';
import {Invoice} from '../../../core/Invoice/Model/Invoice';

@Injectable()
export class SqliteInvoiceDelete
  extends SqliteBaseClass
  implements DeleteInvoiceDAO
{
  async delete(entity: Invoice): Promise<void> {
    const sql = `UPDATE Invoices SET deleted_at = @date WHERE id = @id`;
    this.getDb().prepare(sql).run({
      date: entity.getSoftDelete().value!.toISOString(),
      id: entity.getId().value,
    });
  }
}
