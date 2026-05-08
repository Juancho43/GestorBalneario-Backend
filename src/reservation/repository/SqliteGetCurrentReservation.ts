import {Reservation} from 'core/Reservation/Model/Reservation';
import {Inject, Injectable} from '@nestjs/common';
import {DB_PROVIDER} from '../../database/DBPROVIDER';
import {GetCurrentReservationsDAO} from '../../../core/Reservation/Model/DAO/GetCurrentReservationsDAO';
import {GetCurrentReservationsQuery} from 'core/Reservation/Application/Queries/GetCurrentReservationsQuery';
import {Booking} from '../../../core/Reservation/Model/Booking';
import {Timestamps} from '../../../core/common/Model/Timestamps';
import {SoftDelete} from '../../../core/common/Model/SoftDelete';
import {UUID} from '../../../core/common/Model/UUID';
import {SqliteBaseClass} from "../../database/SqliteBaseClass";

@Injectable()
export class SqliteGetCurrentReservation extends SqliteBaseClass implements GetCurrentReservationsDAO {

  async get(query: GetCurrentReservationsQuery): Promise<Reservation[]> {
    const limit = query.pageSize;
    const offset = (query.page - 1) * limit;
    const sql = `
      SELECT
        r.id, r.checkIn, r.checkOut, r.date,
        c.id as clientId, c.name as clientName, c.email as clientEmail, c.phone as clientPhone,
        s.id as shadowId,s.identifier as shadowIdentifier, s.type as shadowType, s.x as shadowX, s.y as shadowY
      FROM Reservations r
             INNER JOIN Clients c ON r.clientId = c.id
             INNER JOIN Shadows s ON r.shadowId = s.id
      ORDER BY r.date DESC
      LIMIT ? OFFSET ?
    `

    const rows = this.getDb()
      .prepare(sql)
      .all(limit, offset) as any[];
    return rows.map((row) => {
      return Reservation.create(
        UUID.restore(row.id),
        UUID.restore(row.clientId),
        UUID.restore(row.shadowId),
        Booking.create(new Date(row.checkIn), new Date(row.checkOut)),
        Timestamps.create(),
        SoftDelete.empty(),
      );
    });
  }
}
