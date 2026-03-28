import {SqliteBaseClass} from "../../database/SqliteBaseClass";
import {GetInvoiceDAO} from "../../../core/Invoice/Model/DAO/GetInvoiceDAO";
import {Invoice} from "../../../core/Invoice/Model/Invoice";
import {Injectable} from "@nestjs/common";
import {UUID} from "../../../core/common/Model/UUID";
import {Timestamps} from "../../../core/common/Model/Timestamps";
import {SoftDelete} from "../../../core/common/Model/SoftDelete";
import {Reservation_Service} from "../../../core/Billing/Reservation_Service";
import {Money} from "../../../core/Payment/Model/Money";
import {StringObject} from "../../../core/common/Model/StringObject";
@Injectable()
export class SqliteGetInvoice extends SqliteBaseClass implements GetInvoiceDAO{
    async get(id: string): Promise<Invoice | null> {
        const sql = `
            SELECT
                i.id AS invoiceId,
                i.date,
                i.created_at AS createdAtInvoice,
                i.updated_at AS updatedAtInvoice,
                i.deleted_at,
                i.amount AS invoiceAmount,
                i.clientId AS clientId,
                r.price,
                r.reservationId,
                r.serviceId,
                r.id as itemId
            FROM Invoices i
                     LEFT JOIN Reservation_Service r ON r.invoiceId = i.id
            WHERE i.id = @id and i.deleted_at IS NULL
        `
        const result = this.getDb().prepare(sql).all({id}) as any;
        let invoice :Invoice|null = null
        if(result){
            invoice = Invoice.create(
             UUID.restore(result[0].invoiceId),
                new Date(result[0].date),
                UUID.restore(result[0].clientId),
                Timestamps.restore(new Date(result[0].createdAtInvoice),new Date(result[0].updatedAtInvoice)),
                SoftDelete.empty()
            )
                result.forEach((row: any) => {
                    const item = Reservation_Service.create(
                        UUID.restore(row.itemId),
                        Money.create(row.price),
                        StringObject.create('Booking'),
                        UUID.restore(row.serviceId),
                        UUID.restore(row.reservationId),
                        UUID.restore(row.invoiceId),
                    )
                    invoice!.addItem(item)
                })
        }
       return invoice;
    }
}