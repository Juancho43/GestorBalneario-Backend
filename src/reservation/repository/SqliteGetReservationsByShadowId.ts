import {SqliteBaseClass} from "../../database/SqliteBaseClass";
import {GetReservationsByShadowIdDAO} from "../../../core/Reservation/Model/DAO/GetReservationsByShadowIdDAO";
import {Injectable} from "@nestjs/common";
import {Reservation} from "core/Reservation/Model/Reservation";
import {UUID} from "../../../core/common/Model/UUID";
import {Booking} from "../../../core/Reservation/Model/Booking";
import {Timestamps} from "../../../core/common/Model/Timestamps";
import {SoftDelete} from "../../../core/common/Model/SoftDelete";

@Injectable()
export class SqliteGetReservationsByShadowId extends SqliteBaseClass implements GetReservationsByShadowIdDAO {
   async get(shadowId: string): Promise<Reservation[]> {
        const sql = `
        SELECT * FROM reservations WHERE shadowId = ?
        `
        const result = this.getDb().prepare(sql).all(shadowId) as any;
        return result.map((row) => {
            return Reservation.create(
                UUID.restore(row.id),
                UUID.restore(row.clientId),
                UUID.restore(shadowId),
                Booking.create(new Date(row.checkIn), new Date(row.checkOut)),
                row.price,
                Timestamps.restore(new Date(row.created_at), new Date(row.updated_at)),
                SoftDelete.empty()
            )
        });
    }

}