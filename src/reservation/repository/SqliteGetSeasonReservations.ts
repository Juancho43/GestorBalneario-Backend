import {Injectable} from "@nestjs/common";
import {SqliteBaseClass} from "../../database/SqliteBaseClass";
import {GetSeasonReservationsDAO} from "../../../core/Reservation/Application/Interfaces/GetSeasonReservationsDAO";
import { Reservation } from "core/Reservation/Model/Reservation";
import { GetSeasonEntityQuery } from "core/Service/Application/Queries/GetSeasonEntityQuery";
import {UUID} from "../../../core/common/Model/UUID";
import {Booking} from "../../../core/Reservation/Model/Booking";
import {Timestamps} from "../../../core/common/Model/Timestamps";
import {SoftDelete} from "../../../core/common/Model/SoftDelete";

@Injectable()
export class SqliteGetSeasonReservations extends SqliteBaseClass implements GetSeasonReservationsDAO {
    async get(query: GetSeasonEntityQuery): Promise<Reservation[]> {
        const sql = `
            SELECT 
                r.id as ReservationId,
                r.date as ReservationDate,
                r.checkOut as ReservationCheckOut,
                r.checkIn as ReservationCheckIn,
                r.clientId,
                r.shadowId,
                r.created_at,
                r.updated_at,
                * FROM Reservations r
                              INNER JOIN Season_Shadows ss ON r.shadowId = ss.shadowId
            WHERE ss.seasonId = @id and r.deleted_at IS NULL
            LIMIT @limit OFFSET @offset
        `
        const results = this.getDb().prepare(sql).all({
            id: query.seasonId,
            offset: query.page,
            limit: query.pageSize,
        }) as any[];
        const data : Reservation[]=[];
        results.forEach((row) => {
            data.push(
                Reservation.create(
                    UUID.restore(row.ReservationId),
                    UUID.restore(row.clientId),
                    UUID.restore(row.shadowId),
                    Booking.create(new Date(row.ReservationCheckIn), new Date(row.ReservationCheckOut)),
                    Timestamps.restore(row.created_at,row.update_at),
                    SoftDelete.empty(),
                )
            )
        })
        return data;
    }
}