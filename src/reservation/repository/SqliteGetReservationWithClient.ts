import {SqliteBaseClass} from "../../database/SqliteBaseClass";
import {GetReservationWithClientDAO} from "../../../core/Reservation/Model/DAO/GetReservationWithClientDAO";
import {Reservation} from "../../../core/Reservation/Model/Reservation";
import {Client} from "../../../core/Client/Model/Client";
import {Injectable} from "@nestjs/common";
import {SoftDelete} from "../../../core/common/Model/SoftDelete";
import {UUID} from "../../../core/common/Model/UUID";
import {StringObject} from "../../../core/common/Model/StringObject";
import {EmailObject} from "../../../core/common/Model/EmailObject";
import {Timestamps} from "../../../core/common/Model/Timestamps";
import {Booking} from "../../../core/Reservation/Model/Booking";

@Injectable()
export class SqliteGetReservationWithClient extends SqliteBaseClass implements GetReservationWithClientDAO {
    async get(id: string): Promise<{ client: Client; reservation: Reservation }> {
        const sql = `
            SELECT 
                c.name,
                c.phone,
                c.email,
                r.price,
                r.checkIn,
                r.checkOut,
                r.date,
                r.shadowId,
                c.id AS clientId,
                r.id AS reservationId,
                c.updated_at AS clientUpdated,
                c.created_at AS clientCreated,
                r.created_at AS resCreated,
                r.updated_at AS resUpdated
            FROM reservations r
                INNER JOIN clients c ON r.clientId = c.id
            WHERE r.id=? and r.deleted_at IS NULL and c.deleted_at IS NULL
        `;
        const result = this.getDb().prepare(sql).get(id) as any;
        return {
            client: Client.create(
                UUID.restore(result.clientId),
                StringObject.create(result.name),
                EmailObject.create(result.email),
                StringObject.create(result.phone),
                Timestamps.restore(new Date(result.clientCreated), new Date(result.clientUpdated)),
                SoftDelete.empty()
            ),
            reservation: Reservation.create(
                UUID.restore(result.reservationId),
                UUID.restore(result.clientId),
                UUID.restore(result.shadowId),
                Booking.create(new Date(result.checkIn), new Date(result.checkOut)),
                result.price,
                Timestamps.restore(new Date(result.resCreated), new Date(result.resUpdated)),
                SoftDelete.empty()
            )
        };
    }

}