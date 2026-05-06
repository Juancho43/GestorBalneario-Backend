import {Reservation} from '../Reservation';

export interface DeleteReservationDAO {
  delete(entity: Reservation): Promise<void>;
}
