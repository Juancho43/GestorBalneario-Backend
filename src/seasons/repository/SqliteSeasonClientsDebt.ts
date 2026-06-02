import {Injectable} from "@nestjs/common";
import {SeasonClientsDebtDAO} from "../../../core/Season/Application/Interfaces/SeasonClientsDebtDAO";
import {SqliteBaseClass} from "../../database/SqliteBaseClass";
import {Invoice} from "core/Invoice/Model/Invoice";
import {GetSeasonQuery} from "core/Season/Application/Queries/GetSeasonQuery";
import {UUID} from "core/common/Model/UUID";
import {Timestamps} from "../../../core/common/Model/Timestamps";
import {SoftDelete} from "../../../core/common/Model/SoftDelete";
import {Payment} from "../../../core/Payment/Model/Payment";
import {StringObject} from "../../../core/common/Model/StringObject";
import {PaymentType} from "../../../core/Payment/Model/PaymentType";
import {Money} from "../../../core/Payment/Model/Money";
import {CreateInvoiceItem} from "../../../core/Invoice/Application/UseCase/CreateInvoiceItem";

@Injectable()
export class SqliteSeasonClientsDebt extends SqliteBaseClass implements SeasonClientsDebtDAO {
    async get(query: GetSeasonQuery): Promise<Invoice[]> {
        const sql = `
            SELECT
                DISTINCT i.id AS invoiceId,
                         i.date AS invoiceDate,
                         i.clientId,
                         p.id AS paymentId,
                         p.date AS paymentDate,
                         i.amount,
                         i.state,
                         i.deleted_at,
                         p.finalAmount,
                         p.amount,
                         p.type,
                         p.changeType,
                         p.description,
                         ii.price,
                         ii.id AS invoiceItemId,
                         ii.quantity,
                         s.type AS serviceType,
                         ii.aggregateId,
                         s.id AS serviceId
            FROM Invoices i
                     INNER JOIN Invoice_Items ii ON ii.invoiceId = i.id
                     INNER JOIN Services s ON ii.serviceId = s.id
                     INNER JOIN Season_Services ss ON ss.serviceId = s.id
                     INNER JOIN Seasons se ON ss.seasonId = se.id
                     LEFT JOIN Invoice_Payments ip ON ip.invoiceId = i.id
                     LEFT JOIN Payments p ON ip.paymentId = p.id
            WHERE  i.deleted_at IS NULL AND i.state = 'IssuedState' AND se.id = @seasonId
            ORDER BY i.date DESC;
        `;
        const stmt = this.getDb().prepare(sql);
        const rows = stmt.all({ seasonId: query.seasonId }) as any[];

        const invoiceMap = new Map<string, Invoice>();
        const processedItems = new Set<string>();
        const processedPayments = new Set<string>();

        for (const row of rows) {
            let invoice = invoiceMap.get(row.invoiceId);

            if (!invoice) {
                invoice = Invoice.create(
                    UUID.restore(row.invoiceId),
                    new Date(row.invoiceDate),
                    UUID.restore(row.clientId),
                    Timestamps.create(new Date()),
                    SoftDelete.empty()
                );
                invoiceMap.set(row.invoiceId, invoice);
            }

            if (row.invoiceItemId && !processedItems.has(row.invoiceItemId)) {
                processedItems.add(row.invoiceItemId);

                const item = CreateInvoiceItem.create(
                    row.serviceType,
                    row.price,
                    'anything',
                    row.serviceId,
                    row.aggregateId,
                    row.invoiceId,
                    row.invoiceItemId
                );
                invoice.addItem(item);
            }

            if (row.paymentId && !processedPayments.has(row.paymentId)) {
                processedPayments.add(row.paymentId);

                const payment = Payment.create(
                    UUID.restore(row.paymentId),
                    new Date(row.paymentDate),
                    PaymentType.create(row.type),
                    Money.create(row.amount, row.changeType),
                    StringObject.create(row.description),
                    Timestamps.create(new Date()),
                    SoftDelete.empty()
                );
                invoice.addPayment(payment);
            }
        }

        return Array.from(invoiceMap.values());
    }
}