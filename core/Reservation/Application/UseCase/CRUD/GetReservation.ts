import {IUseCase} from '../../../../common/Application/IUseCase';
import {GetReservationDAO} from '../../../Model/DAO/GetReservationDAO';
import {Reservation} from '../../../Model/Reservation';
import {GetByIdQuery} from '../../../../common/Application/GetByIdQuery';
import {EntityNotFoundError} from '../../../../common/Model/Errors/EntityNotFound';

export class GetReservation implements IUseCase<GetByIdQuery, Reservation> {
  constructor(private dao: GetReservationDAO) {}
  async execute(request: GetByIdQuery): Promise<Reservation> {
    const entity = await this.dao.get(request.id);
    if (!entity) {
      throw new EntityNotFoundError(Reservation.name, request.id);
    }
    return entity;
  }
}
