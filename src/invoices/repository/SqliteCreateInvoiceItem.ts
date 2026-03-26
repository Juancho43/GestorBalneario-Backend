import {SqliteBaseClass} from "../../database/SqliteBaseClass";
import {CreateInvoiceItemDAO} from "../../../core/Invoice/Model/DAO/CreateInvoiceItemDAO";
import {Injectable} from "@nestjs/common";
import {InvoiceItem} from "../../../core/Invoice/Model/InvoiceItem";
import {Invoice} from "../../../core/Invoice/Model/Invoice";
@Injectable()
export class SqliteCreateInvoiceItem extends SqliteBaseClass implements CreateInvoiceItemDAO{
    async create(item: InvoiceItem, invoice: Invoice): Promise<void> {
        console.log('EN EL SQL')
        const sqlInvoice = `
            INSERT OR IGNORE INTO Invoices (id,date,amount,clientId,created_at,updated_at)
                VALUES (@id,@date,@amount,@clientId,@created_at,@updated_at)
        `
        const sqlItem = `
            INSERT INTO Reservation_Service (id,invoiceId, reservationId, serviceId, price) 
            VALUES (@id,@invoiceId, @reservationId, @serviceId, @price)
        `
        const sqlUpdate = `
            UPDATE Invoices
            SET amount = (SELECT SUM(price) FROM Reservation_Service WHERE invoiceId = @id)
            WHERE id = @id ;
        `

        const stmtInvoice = this.getDb().prepare(sqlInvoice);
        const stmtItem = this.getDb().prepare(sqlItem);
        const stmtUpdate = this.getDb().prepare(sqlUpdate);


        const transaction = this.getDb().transaction(() => {
            stmtInvoice.run({
                id:invoice.id.value,
                date: invoice.date.toISOString(),
                amount: invoice.amount.toString(),
                clientId: invoice.clientId.value,
                created_at: invoice.timestamps.createdAt.toISOString(),
                updated_at: invoice.timestamps.updatedAt.toISOString(),
            })

            stmtItem.run({
                id:item.getId().value,
                invoiceId: item.getInvoiceId().value,
                reservationId: item.getAggregateId().value,
                serviceId: item.getServiceId().value,
                price: item.getPrice().finalAmount,
            })

            stmtUpdate.run({
                id: item.getInvoiceId().value
            })
        })

        transaction();
    }
}