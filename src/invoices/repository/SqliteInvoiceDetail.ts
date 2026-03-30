import { InvoiceDetailQuery } from "core/Invoice/Application/Queries/InvoiceDetailQuery";
import { InvoiceDetailsDTO } from "core/Invoice/Application/DTO/InvoiceDetailsDTO";
import {InvoiceDetailDAO} from "../../../core/Invoice/Application/Interfaces/InvoiceDetailDAO";
import {SqliteBaseClass} from "../../database/SqliteBaseClass";
import {Injectable} from "@nestjs/common";
import {InvoiceResponse} from "../../../core/Invoice/Application/DTO/InvoiceResponse";
import {ClientResponse} from "../../../core/Client/Application/DTO/ClientResponse";
import {ShadowResponse} from "../../../core/Shadow/Application/Response/ShadowResponse";
import {ReservationResponse} from "../../../core/Reservation/Application/DTO/ReservationResponse";
import {ItemResponse} from "../../../core/Invoice/Application/DTO/ItemResponse";
import {PaymentResponse} from "../../../core/Payment/Application/DTO/PaymentResponse";

@Injectable()
export class SqliteInvoiceDetail extends SqliteBaseClass implements InvoiceDetailDAO {

    async get(query: InvoiceDetailQuery): Promise<InvoiceDetailsDTO> {
        const sql = `
            SELECT
                *,
                i.id AS invoiceId,
                s.id AS shadowId,
                c.id AS clientId,
                r.id AS reservationId,
                p.id AS paymentId,
                i.date AS invoiceDate,
                i.amount AS invoiceAmount,
                p.description AS paymentDescription,
                p.amount AS paymentAmount,
                p.date AS paymentDate,
                p.type AS paymentType,
                p.changeType AS paymentChangeType,
                r.checkIn,
                r.checkOut,
                rs.price AS priceItem,
                rs.id AS itemId
                
            FROM Invoices i
                     INNER JOIN Invoice_Items rs ON rs.invoiceId = i.id
                     LEFT JOIN Reservations r on rs.aggregateId = r.id and rs.aggregateType = 'Reservations'
                     INNER JOIN Invoice_Payments ip ON ip.invoiceId = i.id
                     INNER JOIN Payments p ON ip.paymentId = p.id
                     INNER JOIN Shadows s ON r.shadowId = s.id
                     INNER JOIN Clients c ON r.clientId = c.id
            WHERE i.id = @id AND i.deleted_at IS NULL
        `
        const results = this.getDb().prepare(sql).all({id:query.id}) as any[];
        const response = new InvoiceDetailsDTO();
        if (results.length === 0) return response;

        // 1. Map the Root Invoice & Client (Common to all rows)
        const firstRow = results[0];
        response.invoice = new InvoiceResponse();
        response.invoice.id = firstRow.invoiceId;
        response.invoice.amount = firstRow.invoiceAmount;
        response.invoice.date = firstRow.invoiceDate;

        response.client = new ClientResponse();
        response.client.id = firstRow.clientId;
        response.client.name = firstRow.name;
        response.client.email = firstRow.email;
        response.client.phone = firstRow.phone;

        // 2. Use Sets to track unique IDs and avoid duplicates from JOINs
        const processedItems = new Set<string>();
        const processedPayments = new Set<string>();

        results.forEach(row => {
            // --- Map Items (Reservations) ---
            if (!processedItems.has(row.itemId)) {
                const item = new ItemResponse();
                item.id = row.itemId;
                item.price = row.priceItem;

                const shadow = new ShadowResponse();
                shadow.id = row.shadowId;
                shadow.identifier = row.identifier;
                shadow.type = row.type;
                shadow.coords = { x: row.x, y: row.y };

                const reservation = new ReservationResponse();
                reservation.id = row.reservationId;
                reservation.dates = { checkIn: row.checkIn, checkOut: row.checkOut };
                reservation.shadow = shadow;

                item.aggregateObject = reservation;
                response.items.push(item);

                processedItems.add(row.itemId);
            }

            // --- Map Payments ---
            if (!processedPayments.has(row.paymentId)) {
                const payment = new PaymentResponse();
                payment.id = row.paymentId;
                payment.amount = row.paymentAmount;
                payment.date = row.paymentDate;
                payment.description = row.paymentDescription;
                payment.type = row.paymentType;

                response.payments.push(payment);

                processedPayments.add(row.paymentId);
            }
        });

        return response;
    }

}