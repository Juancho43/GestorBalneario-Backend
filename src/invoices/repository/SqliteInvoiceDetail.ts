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
                i.date AS invoiceDate,
                i.amount AS invoiceAmount,
                i.state as invoiceState,
                p.id as paymentId,
                p.type as paymentType,
                p.amount as paymentAmount,
                p.changeType as paymentChangeType,
                p.date as paymentDate,
                p.finalAmount as paymentFinalAmount,
                p.description as paymentDescription,
                r.checkIn,
                r.checkOut,
                rs.price AS priceItem,
                rs.id AS itemId,
                rs.aggregateType AS itemAggregateType
            FROM Invoices i
                     LEFT JOIN Invoice_Items rs ON rs.invoiceId = i.id
                     LEFT JOIN Reservations r on rs.aggregateId = r.id and rs.aggregateType = 'Reservations'
                     LEFT JOIN Invoice_Payments ip ON ip.invoiceId = i.id
                     LEFT JOIN Payments p ON ip.paymentId = p.id
                     LEFT JOIN Shadows s ON r.shadowId = s.id
                     LEFT JOIN Clients c ON r.clientId = c.id
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
        response.invoice.state = firstRow.invoiceState;
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
                item.aggregate = row.itemAggregateType;
                item.aggregateObject = reservation;
                response.items.push(item);

                processedItems.add(row.itemId);
            }

            // --- Map Payments ---
            if (!processedPayments.has(row.paymentId)) {
                const paymentResponse = new PaymentResponse();
                paymentResponse.id = row.paymentId;
                paymentResponse.date = row.paymentDate;
                paymentResponse.description = row.paymentDescription;
                paymentResponse.type = row.paymentType;
                paymentResponse.amount = row.paymentAmount;
                paymentResponse.finalAmount = row.paymentAmount * row.paymentChangeType;
                paymentResponse.changeType = row.paymentChangeType;
                response.payments.push(paymentResponse);

                processedPayments.add(row.paymentId);
            }
        });
        return response;
    }
}