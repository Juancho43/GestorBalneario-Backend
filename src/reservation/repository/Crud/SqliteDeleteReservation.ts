import {Reservation} from 'core/Reservation/Model/Reservation';
import {Injectable} from '@nestjs/common';
import {DeleteReservationDAO} from '../../../../core/Reservation/Model/DAO/DeleteReservationDAO';
import {SqliteBaseClass} from '../../../database/SqliteBaseClass';

@Injectable()
export class SqliteDeleteReservation
  extends SqliteBaseClass
  implements DeleteReservationDAO
{
  async delete(entity: Reservation): Promise<void> {
    const sql = `UPDATE Reservations SET deleted_at = @date WHERE id = @id`;
    this.getDb().prepare(sql).run({
      date: entity.getSoftDelete().value!.toISOString(),
      id: entity.getId().value,
    });
  }
}
