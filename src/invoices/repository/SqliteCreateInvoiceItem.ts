import {SqliteBaseClass} from '../../database/SqliteBaseClass';
import {CreateInvoiceItemDAO} from '../../../core/Invoice/Model/DAO/CreateInvoiceItemDAO';
import {Injectable} from '@nestjs/common';
import {CreateInvoiceItemDTO} from "../../../core/Invoice/Application/DTO/CreateInvoiceItemDTO";

@Injectable()
export class SqliteCreateInvoiceItem
  extends SqliteBaseClass
  implements CreateInvoiceItemDAO
{
  async create(data: CreateInvoiceItemDTO): Promise<void> {
    const sqlInvoice = `
            INSERT OR IGNORE INTO Invoices (id,date,state,amount,clientId,created_at,updated_at)
                VALUES (@id,@date,@amount,@state,@clientId,@created_at,@updated_at)
        `;
    const sqlItem = `
            INSERT INTO Invoice_Items (id,invoiceId, aggregateId, aggregateType, serviceId, price) 
            VALUES (@id,@invoiceId, @aggregateId,@type, @serviceId, @price)
        `;
    const sqlUpdate = `
            UPDATE Invoices
            SET amount = (SELECT SUM(price) FROM Invoice_Items WHERE invoiceId = @id)
            WHERE id = @id ;
        `;

    const stmtInvoice = this.getDb().prepare(sqlInvoice);
    const stmtItem = this.getDb().prepare(sqlItem);
    const stmtUpdate = this.getDb().prepare(sqlUpdate);

    const transaction = this.getDb().transaction(() => {
      stmtInvoice.run({
        id: data.invoice.id.value,
        date: data.invoice.date.toISOString(),
        amount: data.invoice.amount.toString(),
        state: data.invoice.state.toString(),
        clientId: data.invoice.clientId.value,
        created_at: data.invoice.timestamps.createdAt.toISOString(),
        updated_at: data.invoice.timestamps.updatedAt.toISOString(),
      });

      stmtItem.run({
        id: data.item.getId().value,
        invoiceId: data.item.getInvoiceId().value,
        aggregateId: data.item.getAggregateId().value,
        type: data.item.getAggregate(),
        serviceId: data.item.getServiceId().value,
        price: data.item.getPrice().finalAmount,
      });

      stmtUpdate.run({
        id: data.item.getInvoiceId().value,
      });
    });

    transaction();
  }
}
