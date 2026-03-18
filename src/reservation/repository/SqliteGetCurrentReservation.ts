import { Reservation } from "core/Reservation/Model/Reservation";
import {Inject, Injectable} from "@nestjs/common";
import {DB_PROVIDER} from "../../database/DBPROVIDER";
import {GetCurrentReservationsDAO} from "../../../core/Reservation/Model/DAO/GetCurrentReservationsDAO";
import { GetCurrentReservationsQuery } from "core/Reservation/Application/DTO/GetCurrentReservationsQuery";
import {Client} from "../../../core/Client/Model/Client";
import {StringObject} from "../../../core/common/Model/StringObject";
import {EmailObject} from "../../../core/common/Model/EmailObject";
import {Shadow} from "../../../core/Shadow/Model/Shadow";
import {ShadowType} from "../../../core/Shadow/Model/ValueObjects/ShadowType";
import {ShadowState} from "../../../core/Shadow/Model/ValueObjects/ShadowState";
import {Coords} from "../../../core/common/Model/Coords";
import {Booking} from "../../../core/Reservation/Model/Booking";

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
                c.id as ClientId, c.name as clientName, c.email as clientEmail, c.phone as clientPhone,
                s.id as shadowId,s.identifier as shadowIdentifier, s.type as shadowType, s.state as shadowState, s.x as shadowX, s.y as shadowY
            FROM Reservations r
                     INNER JOIN Clients c ON r.clientId = c.id
                     INNER JOIN Shadows s ON r.shadowId = s.id
            ORDER BY r.date DESC
            LIMIT ? OFFSET ?
        `).all(limit, offset);

        return rows.map(row =>{
            const mail = EmailObject.create( row.clientEmail);
            const client  = Client.create(
                row.clientId,
                StringObject.create(row.ClientName),
                mail,
                StringObject.create(row.clientPhone)
            );
            const shadow = Shadow.create(
                row.shadowId,
                StringObject.create(row.shadowIdentifier),
                ShadowType.create(row.shadowType),
                ShadowState.create(row.shadowState),
                Coords.create(row.shadowX,row.shadowY)
            );
            return Reservation.create(
                row.id,
                client,
                shadow,
                Booking.create(new Date(row.checkIn), new Date(row.checkOut))
            )
        })
    }


}