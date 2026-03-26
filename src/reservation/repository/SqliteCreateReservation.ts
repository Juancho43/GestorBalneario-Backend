import { Reservation } from "core/Reservation/Model/Reservation";
import {CreateReservationDAO} from "../../../core/Reservation/Model/DAO/CreateReservationDAO";
import {Injectable} from "@nestjs/common";
import {SqliteBaseClass} from "../../database/SqliteBaseClass";

@Injectable()
export class SqliteCreateReservation extends SqliteBaseClass implements CreateReservationDAO {

    async save(reservation: Reservation): Promise<void> {
        const stmt = this.getDb().prepare(`
            INSERT INTO Reservations (id, clientId, shadowId, checkIn, checkOut, date, created_at, updated_at)
            VALUES (@id, @clientId, @shadowId, @checkIn, @checkOut, @date, @created_at, @updated_at)
        `);
        const reserva = {
            id: reservation.id.value,
            clientId: reservation.client.value,
            shadowId: reservation.shadow.value,
            checkIn: reservation.booking.checkIn.toISOString(),
            checkOut: reservation.booking.checkOut.toISOString(),
            date: (new Date()).toISOString(),
            created_at: reservation.timestamp.createdAt.toISOString(),
            updated_at: reservation.timestamp.updatedAt.toISOString(),
        };
        stmt.run(reserva);
    }
}