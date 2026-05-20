import {ReservationDetailResponse} from 'core/Reservation/Application/DTO/ReservationDetailResponse';
import {GetReservationDetailsDAO} from '../../../core/Reservation/Application/Interfaces/GetReservationDetailsDAO';
import {SqliteBaseClass} from '../../database/SqliteBaseClass';
import {ClientResponse} from '../../../core/Client/Application/DTO/ClientResponse';
import {ShadowResponse} from '../../../core/Shadow/Application/Response/ShadowResponse';
import {ReservationResponse} from '../../../core/Reservation/Application/DTO/ReservationResponse';
import {InvoiceResponse} from '../../../core/Invoice/Application/DTO/InvoiceResponse';
import {PaymentResponse} from '../../../core/Payment/Application/DTO/PaymentResponse';

export class SqliteGetReservationDetail
    extends SqliteBaseClass
    implements GetReservationDetailsDAO
{
  async get(id: string): Promise<ReservationDetailResponse> {
    const sql = `
      SELECT
        r.id AS reservationId,
        c.id AS clientId,
        s.id AS shadowId,
        rs.serviceId AS serviceId,
        i.id AS invoiceId,
        p.id AS paymentId,
        r.date AS reservationDate,
        r.checkIn AS reservationCheckIn,
        r.checkOut AS reservationCheckOut,
        r.state AS reservationState,
        c.name AS clientName,
        c.email AS clientEmail,
        c.phone AS clientPhone,
        s.x,
        s.y,
        s.type,
        s.identifier,
        rs.price,
        p.amount AS paymentAmount,
        p.date AS paymentDate,
        p.changeType AS paymentChangeType,
        p.type AS paymentType,
        p.description AS paymentDescription,
        p.finalAmount AS paymentFinalAmount,
        i.amount AS invoiceAmount,
        i.date AS invoiceDate

      FROM
        Reservations r
          LEFT JOIN Shadows s ON r.shadowId = s.id
          LEFT JOIN Clients c ON r.clientId = c.id
          LEFT JOIN Invoice_Items AS rs ON rs.aggregateId = r.id
          LEFT JOIN Invoices i ON rs.invoiceId = i.id
          LEFT JOIN Invoice_Payments AS ip ON ip.invoiceId = i.id
          LEFT JOIN Payments p ON ip.paymentId = p.id
      WHERE r.id = @id AND r.deleted_at IS NULL
    `;
    const rows = this.getDb().prepare(sql).all({ id }) as any;
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
    };
    shadowResponse.type = rows[0].type;
    shadowResponse.identifier = rows[0].identifier;

    const reservationResponse = new ReservationResponse();
    reservationResponse.shadowId = rows[0].shadowId;
    reservationResponse.id = rows[0].reservationId;
    reservationResponse.dates = {
      checkIn: rows[0].reservationCheckIn,
      checkOut: rows[0].reservationCheckOut,
    };
    reservationResponse.state = rows[0].reservationState;
    const invoiceResponse = new InvoiceResponse();
    invoiceResponse.id = rows[0].invoiceId;
    invoiceResponse.amount = rows[0].invoiceAmount;
    invoiceResponse.date = rows[0].invoiceDate;
    invoiceResponse.clientId = rows[0].clientId;

    const paymentsResponse: PaymentResponse[] = [];

    rows.forEach((row) => {
      const paymentResponse = new PaymentResponse();
      paymentResponse.id = row.paymentId;
      paymentResponse.amount = row.paymentAmount;
      paymentResponse.date = row.paymentDate;
      paymentResponse.type = row.paymentType;
      paymentResponse.changeType = row.paymentChangeType;
      paymentResponse.description = row.paymentDescription;
      paymentResponse.finalAmount = row.paymentFinalAmount;
      paymentsResponse.push(paymentResponse);
    });

    const result = new ReservationDetailResponse();
    result.reservation = reservationResponse;
    result.client = clientResponse;
    result.shadow = shadowResponse;
    result.invoice = invoiceResponse;
    result.payments = paymentsResponse;

    return result;
  }
}
