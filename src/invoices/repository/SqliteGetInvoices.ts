import {Injectable} from "@nestjs/common";
import {SqliteBaseClass} from "../../database/SqliteBaseClass";
import {GetInvoicesDAO} from "../../../core/Invoice/Model/DAO/GetInvoicesDAO";
import { Invoice } from "core/Invoice/Model/Invoice";
import {UUID} from "../../../core/common/Model/UUID";
import {Timestamps} from "../../../core/common/Model/Timestamps";
import {SoftDelete} from "../../../core/common/Model/SoftDelete";
import {Reservation_Service} from "../../../core/Billing/Reservation_Service";
import {Money} from "../../../core/Payment/Model/Money";
import {StringObject} from "../../../core/common/Model/StringObject";

@Injectable()
export class SqliteGetInvoices extends SqliteBaseClass implements GetInvoicesDAO {

    async get(): Promise<Invoice[]> {
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
            WHERE i.deleted_at IS NULL
            LIMIT @limit OFFSET @offset
        `
        const results = this.getDb().prepare(sql).all({
            limit:10,
            offset:0,
        }) as any[];

        const invoiceMap: Map<string, Invoice> = new Map();
        results.forEach((row) => {
            const id = row.invoiceId;

            // 1. If this is the first time we see this invoice, create the Invoice object
            if (!invoiceMap.has(id)) {
                const newInvoice = Invoice.create(
                    UUID.restore(row.invoiceId),
                    new Date(row.date),
                    UUID.restore(row.clientId),
                    Timestamps.restore(new Date(row.createdAtInvoice), new Date(row.updatedAtInvoice)),
                    SoftDelete.empty()
                );
                invoiceMap.set(id, newInvoice);
            }

            // 2. If there is a linked item (r.id is not null), create and add it
            if (row.itemId) {
                const item = Reservation_Service.create(
                    UUID.restore(row.itemId),
                    Money.create(row.price),
                    StringObject.create('Booking'),
                    UUID.restore(row.serviceId),
                    UUID.restore(row.reservationId),
                    UUID.restore(row.invoiceId)
                );

                // Add the item to the invoice stored in our Map
                invoiceMap.get(id)!.addItem(item);
            }
        });

        // Return the values of the map as an array
        return Array.from(invoiceMap.values());
    }
}