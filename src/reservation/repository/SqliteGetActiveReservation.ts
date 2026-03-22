import {GetActiveReservationsDAO} from "../../../core/Reservation/Model/DAO/GetActiveReservationsDAO";
import {Injectable} from "@nestjs/common";
import {Reservation} from "../../../core/Reservation/Model/Reservation";
import {Booking} from "../../../core/Reservation/Model/Booking";
import {Timestamps} from "../../../core/common/Model/Timestamps";
import {SoftDelete} from "../../../core/common/Model/SoftDelete";
import {UniqueIdentifier} from "../../../core/common/Model/UniqueIdentifier";
import {SqliteBaseClass} from "../../database/SqliteBaseClass";
@Injectable()
export class SqliteGetActiveReservation extends SqliteBaseClass implements GetActiveReservationsDAO{

    get(): Reservation[] {
        const sql = `
            SELECT r.* FROM Reservations r
                              inner join Shadows s on r.shadowId = s.id
                              inner join Clients c on r.clientId = c.id
            WHERE CURRENT_TIMESTAMP BETWEEN r.checkIn AND r.checkOut
            ORDER BY r.date DESC
        `;
        const rows = this.getDb().prepare(sql).all() as any;
        console.log(rows)
        return rows.map(row =>{
            return Reservation.create(
                UniqueIdentifier.restore(row.id),
                UniqueIdentifier.restore(row.clientId),
                UniqueIdentifier.restore(row.shadowId),
                Booking.create(new Date(row.checkIn), new Date(row.checkOut)),
                row.price,
                Timestamps.create(),
                SoftDelete.empty()
            )
        })
    }

}