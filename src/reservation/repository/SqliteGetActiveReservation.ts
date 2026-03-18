import {GetActiveReservationsDAO} from "../../../core/Reservation/Model/DAO/GetActiveReservationsDAO";
import {Inject, Injectable} from "@nestjs/common";
import {DB_PROVIDER} from "../../database/DBPROVIDER";
import {Reservation} from "../../../core/Reservation/Model/Reservation";
import {Booking} from "../../../core/Reservation/Model/Booking";
import {EmailObject} from "../../../core/common/Model/EmailObject";
import {Coords} from "../../../core/common/Model/Coords";
import {Shadow} from "../../../core/Shadow/Model/Shadow";
import {Client} from "../../../core/Client/Model/Client";
import {StringObject} from "../../../core/common/Model/StringObject";
import {ShadowType} from "../../../core/Shadow/Model/ValueObjects/ShadowType";
import {ShadowState} from "../../../core/Shadow/Model/ValueObjects/ShadowState";
@Injectable()
export class SqliteGetActiveReservation implements GetActiveReservationsDAO{

    constructor(@Inject(DB_PROVIDER) private readonly db: any) {}

    get(): Reservation[] {
        const sql = `
            SELECT * FROM Reservations r
                              inner join Shadows s on r.shadowId = s.id
                              inner join Clients c on r.clientId = c.id
            WHERE CURRENT_TIMESTAMP BETWEEN r.checkIn AND r.checkOut
            ORDER BY r.date DESC
        `;
        const rows = this.db.prepare(sql).all();
        const results: Reservation[] = [];
        console.log(rows)
        rows.forEach((row) => {
            const client  = Client.create(
                row.clientId,
                StringObject.create(row.name),
                EmailObject.create( row.email),
                StringObject.create(row.phone)
            );
            const shadow = Shadow.create(
                row.shadowId,
                StringObject.create(row.identifier),
                ShadowType.create(row.type),
                ShadowState.create(row.state),
                Coords.create(row.x,row.y)
            );
            results.push( Reservation.create(
                row.id,
                client,
                shadow,
                Booking.create(new Date(row.checkIn), new Date(row.checkOut))
            ))

        })
        return results;
    }

}