import {GetCurrentReservationsQuery} from '../../Application/Queries/GetCurrentReservationsQuery';
import {Reservation} from '../Reservation';

export interface GetCurrentReservationsDAO {
  get(query: GetCurrentReservationsQuery): Promise<Reservation[]>;
}
