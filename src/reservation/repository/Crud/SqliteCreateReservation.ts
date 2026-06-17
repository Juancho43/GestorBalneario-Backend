import {Reservation} from 'core/Reservation/Model/Reservation';
import {CreateReservationDAO} from '../../../../core/Reservation/Model/DAO/CreateReservationDAO';
import {Injectable} from '@nestjs/common';
import {SqliteBaseClass} from '../../../database/SqliteBaseClass';

@Injectable()
export class SqliteCreateReservation
  extends SqliteBaseClass
  implements CreateReservationDAO
{
  async save(reservation: Reservation): Promise<void> {
    //TODO: update shadow state on DB to booked, create a transaction
    const stmt = this.getDb().prepare(`
            INSERT INTO Reservations (id, clientId, shadowId, checkIn, checkOut, date, created_at, updated_at)
            VALUES (@id, @clientId, @shadowId, @checkIn, @checkOut, @date, @created_at, @updated_at)
        `);
    const reserva = {
      id: reservation.id.value,
      clientId: reservation.client.value,
      shadowId: reservation.shadow.value,
      checkIn: reservation.booking.startDate.toISOString(),
      checkOut: reservation.booking.endDate.toISOString(),
      date: new Date().toISOString(),
      created_at: reservation.timestamp.createdAt.toISOString(),
      updated_at: reservation.timestamp.updatedAt.toISOString(),
    };
    stmt.run(reserva);
  }
}
