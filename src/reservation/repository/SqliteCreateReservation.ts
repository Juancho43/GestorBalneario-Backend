import { Reservation } from "core/Reservation/Model/Reservation";
import {CreateReservationDAO} from "../../../core/Reservation/Model/DAO/CreateReservationDAO";
import {Inject, Injectable} from "@nestjs/common";
import {DB_PROVIDER} from "../../database/DBPROVIDER";

@Injectable()
export class SqliteCreateReservation implements CreateReservationDAO {

    constructor(@Inject(DB_PROVIDER) private readonly db: any) {}
   async save(reservation: Reservation): Promise<void> {
        const stmt = this.db.prepare(`
            INSERT INTO Reservations (id, clientId, shadowId, checkIn, checkOut, date)
            VALUES (@id, @clientId, @shadowId, @checkIn, @checkOut, @date)
        `);

        const reserva = {
            id: reservation.id,
            clientId: reservation.client.id,
            shadowId: reservation.shadow.id,
            checkIn: reservation.booking.checkIn.toISOString(),
            checkOut: reservation.booking.checkOut.toISOString(),
            date: (new Date()).toISOString(),
        };

        const result = stmt.run(reserva);
        console.log('Insert result:', result);
        if (result.changes > 0) {
            const update= this.db.prepare('UPDATE Shadows SET state = @state WHERE id = @id').run({state:reservation.shadow.state.state ,id:reserva.shadowId});
        }
    }

}