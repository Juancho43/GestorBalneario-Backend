import {Injectable} from "@nestjs/common";
import {SqliteBaseClass} from "../../database/SqliteBaseClass";
import {GetSeasonReservationsDAO} from "../../../core/Reservation/Application/Interfaces/GetSeasonReservationsDAO";
import {GetSeasonEntityQuery} from "core/Service/Application/Queries/GetSeasonEntityQuery";
import {ReservationResponse} from "../../../core/Reservation/Application/DTO/ReservationResponse";
import {ShadowResponse} from "../../../core/Shadow/Application/Response/ShadowResponse";
import {ClientResponse} from "../../../core/Client/Application/DTO/ClientResponse";

@Injectable()
export class SqliteGetSeasonReservations extends SqliteBaseClass implements GetSeasonReservationsDAO {
    async get(query: GetSeasonEntityQuery): Promise<ReservationResponse[]> {
        const limit = query.pageSize;
        const offset = (query.page > 0 ? query.page - 1 : 0) * query.pageSize;
        const sql = `
            SELECT
                r.id AS reservationId,
                r.checkOut AS reservationCheckout,
                r.checkIn AS reservationCheckin,
                ii.price AS reservationPrice,
                r.state AS reservationState,
                s.type AS shadowType,
                s.identifier AS shadowIdentifier,
                c.name AS client,
                c.id AS clientId,
                s.id AS shadowId,
                ss.id AS serviceId,
                se.description AS service
            FROM Reservations r
                     INNER JOIN Shadows s ON r.shadowId = s.id
                     INNER JOIN Clients c ON r.clientId = c.id
                     INNER JOIN Invoice_Items ii ON ii.aggregateId = r.id
                     INNER JOIN Services se ON ii.serviceId = se.id
                     INNER JOIN Season_Shadows ss ON r.shadowId = ss.shadowId
            WHERE ss.seasonId = @id AND r.deleted_at IS NULL
            ORDER BY r.date DESC
            LIMIT @limit OFFSET @offset
        `
        const results = this.getDb().prepare(sql).all({
            id: query.seasonId,
            offset: offset,
            limit:limit,
        }) as any[];
        const data : ReservationResponse[]=[];
        results.forEach((row) => {
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
            data.push(response)
        })
        return data;
    }
}