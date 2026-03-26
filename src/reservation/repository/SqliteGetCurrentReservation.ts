import { Reservation } from "core/Reservation/Model/Reservation";
import {Inject, Injectable} from "@nestjs/common";
import {DB_PROVIDER} from "../../database/DBPROVIDER";
import {GetCurrentReservationsDAO} from "../../../core/Reservation/Model/DAO/GetCurrentReservationsDAO";
import { GetCurrentReservationsQuery } from "core/Reservation/Application/DTO/GetCurrentReservationsQuery";
import {Booking} from "../../../core/Reservation/Model/Booking";
import {Timestamps} from "../../../core/common/Model/Timestamps";
import {SoftDelete} from "../../../core/common/Model/SoftDelete";
import {UUID} from "../../../core/common/Model/UUID";

@Injectable()
export class SqliteGetCurrentReservation implements GetCurrentReservationsDAO {

    constructor(@Inject(DB_PROVIDER) private readonly db: any) {
    }

    async get(query: GetCurrentReservationsQuery): Promise<Reservation[]> {
        const limit = query.pageSize;
        const offset = (query.page - 1) * limit;

        // Utilizamos JOIN para traer los datos relacionados en un solo paso
        const rows = this.db.prepare(`
            SELECT
                r.id, r.checkIn, r.checkOut, r.date,
                c.id as clientId, c.name as clientName, c.email as clientEmail, c.phone as clientPhone,
                s.id as shadowId,s.identifier as shadowIdentifier, s.type as shadowType, s.x as shadowX, s.y as shadowY
            FROM Reservations r
                     INNER JOIN Clients c ON r.clientId = c.id
                     INNER JOIN Shadows s ON r.shadowId = s.id
            ORDER BY r.date DESC
            LIMIT ? OFFSET ?
        `).all(limit, offset);
        return rows.map(row =>{
            return Reservation.create(
                UUID.restore(row.id),
                UUID.restore(row.clientId),
                UUID.restore(row.shadowId),
                Booking.create(new Date(row.checkIn), new Date(row.checkOut)),
                Timestamps.create(),
                SoftDelete.empty()
            )
        })
    }


}