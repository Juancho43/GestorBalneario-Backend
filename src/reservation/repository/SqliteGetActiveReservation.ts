import {GetActiveReservationsDAO} from '../../../core/Reservation/Application/Interfaces/GetActiveReservationsDAO';
import {Injectable} from '@nestjs/common';
import {SqliteBaseClass} from '../../database/SqliteBaseClass';
import {ReservationResponse} from "../../../core/Reservation/Application/DTO/ReservationResponse";
import {ShadowResponse} from "../../../core/Shadow/Application/Response/ShadowResponse";
import {ClientResponse} from "../../../core/Client/Application/DTO/ClientResponse";
import {PaginatedQuery} from "../../../core/common/Application/PaginatedQuery";

@Injectable()
export class SqliteGetActiveReservation
  extends SqliteBaseClass
    implements GetActiveReservationsDAO
{
  async get(query: PaginatedQuery): Promise<ReservationResponse[]> {
    const limit = query.pageSize;
    const offset = (query.page > 0 ? query.page - 1 : 0) * query.pageSize;
    const sql = `
      SELECT
        r.id AS reservationId,
        r.checkOut AS reservationCheckout,
        r.checkIn AS reservationCheckin,
        r.state AS reservationState,
        ii.price AS reservationPrice,
        s.type AS shadowType,
        s.identifier AS shadowIdentifier,
        c.name AS client,
        c.id AS clientId,
        s.id AS shadowId,
        ss.id AS serviceId,
        ss.description AS service
      FROM Reservations r
             INNER JOIN Shadows s ON r.shadowId = s.id
             INNER JOIN Clients c ON r.clientId = c.id
             INNER JOIN Invoice_Items ii ON ii.aggregateId = r.id
             INNER JOIN Services ss ON ii.serviceId = ss.id
      WHERE r.state = 'ActiveState'  
      ORDER BY r.date DESC
      LIMIT @limit OFFSET @offset
    `;
    const rows = this.getDb().prepare(sql).all({
      limit: limit,
      offset: offset
    }) as any[];
    const dto : ReservationResponse[] = [];

    rows.forEach(row => {
      const response = new ReservationResponse();
      response.id = row.reservationId;
      response.dates = {
        checkOut: row.reservationCheckout,
        checkIn: row.reservationCheckin
      }
      response.price = row.reservationPrice;
      response.state = row.reservationState;
      const shadow = new ShadowResponse();
      shadow.identifier = row.shadowIdentifier;
      shadow.type = row.shadowType;
      shadow.id= row.shadowId;
      response.shadow = shadow;
      response.shadowId = row.shadowId;
      const client = new ClientResponse();
      client.name=row.client;
      client.id = row.clientId;
      response.client = client;
      response.serviceId = row.serviceId;
      dto.push(response);
    })
    return dto;
  }
}
