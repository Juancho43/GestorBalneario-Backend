import {Reservation} from '../../Model/Reservation';

export interface GetActiveReservationsDAO {
  get(): Reservation[];
}
