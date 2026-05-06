import {IUseCase} from '../../../common/Application/IUseCase';
import {Reservation} from '../../Model/Reservation';
import {GetActiveReservationsDAO} from '../Interfaces/GetActiveReservationsDAO';

export class GetActiveReservations implements IUseCase<null, Reservation[]> {
  constructor(private readonly dao: GetActiveReservationsDAO) {}

  async execute(request: null): Promise<Reservation[]> {
    return this.dao.get();
  }
}
