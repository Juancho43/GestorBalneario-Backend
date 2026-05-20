import {Reservation} from 'core/Reservation/Model/Reservation';
import {Inject, Injectable} from '@nestjs/common';
import {DB_PROVIDER} from '../../../database/DBPROVIDER';
import {UpdateReservationDAO} from '../../../../core/Reservation/Model/DAO/UpdateReservationDAO';

@Injectable()
export class SqliteUpdateReservation implements UpdateReservationDAO {
    constructor(@Inject(DB_PROVIDER) private readonly db: any) {}
    async update(reservation: Reservation): Promise<void> {
        const stmt = this.db.prepare(`
            UPDATE Reservations
            SET
                checkIn = @checkIn,
                checkOut = @checkOut
            WHERE id = @id
        `);

        const reservaActualizada = {
            id: reservation.id.value,
            checkIn: reservation.booking.checkIn.toISOString(),
            checkOut: reservation.booking.checkOut.toISOString(),
        };

        stmt.run(reservaActualizada);
    }
}
