import {DeleteInvoiceItemDTO} from "core/Invoice/Application/DTO/DeleteInvoiceItemDTO";
import {DeleteInvoiceItemDAO} from "../../../core/Invoice/Model/DAO/DeleteInvoiceItemDAO";
import {SqliteBaseClass} from "../../database/SqliteBaseClass";
import {Injectable} from "@nestjs/common";

@Injectable()
export class SqliteDeleteInvoiceItem extends SqliteBaseClass implements DeleteInvoiceItemDAO {
    async delete(data: DeleteInvoiceItemDTO): Promise<void> {
        const sql = `
            UPDATE Invoice_Items
            SET deleted_at = @deleteAt
            WHERE invoiceId = @invoiceId AND id = @itemId
        `
        this.getDb().prepare(sql).run({
            deleteAt : new Date().toISOString(),
            invoiceId: data.invoice.id.value,
            itemId: data.itemId,
        });
    }
}