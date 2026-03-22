import { Reservation } from "core/Reservation/Model/Reservation";
import {Injectable} from "@nestjs/common";
import {GetReservationDAO} from "../../../core/Reservation/Model/DAO/GetReservationDAO";
import {SqliteBaseClass} from "../../database/SqliteBaseClass";
import {UniqueIdentifier} from "../../../core/common/Model/UniqueIdentifier";
import {Booking} from "../../../core/Reservation/Model/Booking";
import {Timestamps} from "../../../core/common/Model/Timestamps";
import {SoftDelete} from "../../../core/common/Model/SoftDelete";

@Injectable()
export class SqliteGetReservation extends SqliteBaseClass implements GetReservationDAO {


    async get(id: string): Promise<Reservation | null> {
        const sql = `SELECT * FROM Reservations WHERE id = ?`;
        const row = this.getDb().prepare(sql).get(id) as any;
        if (!row) {
            return null; // Si no hay fila, devolvemos null
        }

        return Reservation.create(
            UniqueIdentifier.restore(row.id),
            UniqueIdentifier.restore(row.clientId),
            UniqueIdentifier.restore(row.shadowId),
            Booking.create(new Date(row.checkIn), new Date(row.checkOut)),
            row.price,
            Timestamps.restore(new Date(row.created_at), new Date(row.updated_at)),
            SoftDelete.empty()
        );
    }

}