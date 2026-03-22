import { Reservation } from "core/Reservation/Model/Reservation";
import {CreateReservationDAO} from "../../../core/Reservation/Model/DAO/CreateReservationDAO";
import {Inject, Injectable} from "@nestjs/common";
import {DB_PROVIDER} from "../../database/DBPROVIDER";
import {UpdateReservationDAO} from "../../../core/Reservation/Model/DAO/UpdateReservationDAO";

@Injectable()
export class SqliteUpdateReservation implements UpdateReservationDAO {

    constructor(@Inject(DB_PROVIDER) private readonly db: any) {}
    async update(reservation: Reservation): Promise<boolean> {
        const stmt = this.db.prepare(`
            UPDATE Reservations
            SET clientId = @clientId,
                shadowId = @shadowId,
                checkIn = @checkIn,
                checkOut = @checkOut
            WHERE id = @id
        `);

        const reservaActualizada = {
            id: reservation.id, // Es vital usar el ID para filtrar
            clientId: reservation.client,
            shadowId: reservation.shadow,
            checkIn: reservation.booking.checkIn.toString(),
            checkOut: reservation.booking.checkOut.toString(),
        };

        const result = stmt.run(reservaActualizada);
        return result.affectedRows > 0;
    }

}