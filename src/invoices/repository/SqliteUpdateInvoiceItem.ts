import {Injectable} from "@nestjs/common";
import {SqliteBaseClass} from "../../database/SqliteBaseClass";
import {UpdateInvoiceItemDAO} from "../../../core/Invoice/Model/DAO/UpdateInvoiceItemDAO";
import { UpdateInvoiceItemDTO } from "core/Invoice/Application/DTO/UpdateInvoiceItemDTO";

@Injectable()
export class SqliteUpdateInvoiceItem extends SqliteBaseClass implements UpdateInvoiceItemDAO {
    async update(data: UpdateInvoiceItemDTO): Promise<void> {
        const sql = `
            UPDATE invoice_items
            SET price = @price 
            WHERE id = @id AND invoiceId = @invoiceId 
        `;
        const stmt = this.getDb().prepare(sql);
        stmt.run({
            price: data.item.getPrice().amount,
            id: data.item.getId().value,
            invoiceId: data.invoice.id.value,
        })
    }
}