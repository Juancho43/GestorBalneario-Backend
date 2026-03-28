import { ReservationDetailResponse } from "core/Reservation/Application/DTO/ReservationDetailResponse";
import {GetReservationDetailsDAO} from "../../../core/Reservation/Model/DAO/GetReservationDetailsDAO";
import {SqliteBaseClass} from "../../database/SqliteBaseClass";
import {ClientResponse} from "../../../core/Client/Application/DTO/ClientResponse";
import {ShadowResponse} from "../../../core/Shadow/Application/Response/ShadowResponse";
import {ReservationResponse} from "../../../core/Reservation/Application/DTO/ReservationResponse";
import {InvoiceResponse} from "../../../core/Invoice/Application/DTO/InvoiceResponse";
import {PaymentResponse} from "../../../core/Payment/Application/DTO/PaymentResponse";

export class SqliteGetReservationDetail extends SqliteBaseClass implements GetReservationDetailsDAO {
    async get(id: string): Promise<ReservationDetailResponse> {
        const sql = `
            SELECT
                r.id as reservationId,
                c.id as clientId,
                s.id as shadowId,
                rs.serviceId as serviceId,
                rs.invoiceId as invoiceId,
                p.id as paymentId,
                r.date as reservationDate,
                r.checkIn as reservationCheckIn,
                r.checkOut as reservationCheckOut,
                c.name as clientName,
                c.email as clientEmail,
                c.phone as clientPhone,
                s.x,
                s.y,
                s.type,
                s.identifier,
                rs.price,
                p.amount as paymentAmount,
                p.date as paymentDate,
                p.changeType as paymentChangeType,
                p.type as paymentType,
                p.description as paymentDescription,
                p.finalAmount as paymentFinalAmount,
                i.amount as invoiceAmount,
                i.date as invoiceDate
             
            FROM
                Reservations r
                    LEFT JOIN Shadows s ON r.shadowId = s.id
                    LEFT JOIN Clients c ON r.clientId = c.id
                    LEFT JOIN Reservation_Service AS rs ON rs.reservationId = r.id
                    LEFT JOIN Invoices i ON rs.invoiceId = i.id
                    LEFT JOIN Invoice_Payments AS ip ON ip.invoiceId = i.id
                    LEFT JOIN Payments p ON ip.paymentId = p.id
            WHERE r.id = @id AND r.deleted_at IS NULL
        `
        const rows = this.getDb().prepare(sql).all({id}) as any;

        const clientResponse = new ClientResponse();
        clientResponse.id = rows[0].clientId;
        clientResponse.name = rows[0].clientName;
        clientResponse.email = rows[0].clientEmail;
        clientResponse.phone = rows[0].clientPhone;
        const shadowResponse = new ShadowResponse();
        shadowResponse.id = rows[0].shadowId;
        shadowResponse.coords = {
            x: rows[0].x,
            y: rows[0].y,
        }
        shadowResponse.type = rows[0].type
        shadowResponse.identifier= rows[0].identifier
        const reservationResponse = new ReservationResponse()
        reservationResponse.id = rows[0].reservationId;
        reservationResponse.dates = {
            checkIn: rows[0].reservationCheckIn,
            checkOut: rows[0].reservationCheckOut,
        }
        const invoiceResponse = new InvoiceResponse();
        invoiceResponse.id = rows[0].invoiceId;
        invoiceResponse.amount = rows[0].invoiceAmount;
        invoiceResponse.date = rows[0].invoiceDate;
        invoiceResponse.clientId = rows[0].clientId;




        const paymentsResponse : PaymentResponse[] = [];

        rows.forEach(row => {
            const paymentResponse = new PaymentResponse();
            paymentResponse.id = row.paymentId;
            paymentResponse.amount = row.paymentAmount;
            paymentResponse.date = row.paymentDate;
            paymentResponse.type = row.paymentType;
            paymentResponse.changeType = row.paymentChangeType;
            paymentResponse.description = row.paymentDescription;
            paymentResponse.finalAmount = row.paymentFinalAmount;
            paymentsResponse.push(paymentResponse);
        })


        const result = new ReservationDetailResponse();
        result.reservation = reservationResponse;
        result.client = clientResponse;
        result.shadow = shadowResponse;
        result.invoice = invoiceResponse;
        result.payments = paymentsResponse;

        return result
    }
}