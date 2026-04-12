import { IUseCase } from '../../../../common/Application/IUseCase';
import { DeleteReservationDAO } from '../../../Model/DAO/DeleteReservationDAO';
import { EntityNotFoundError } from '../../../../common/Model/Errors/EntityNotFound';
import { DeleteCommand } from '../../../../common/Application/DeleteCommand';
import { GetReservationDAO } from '../../../Model/DAO/GetReservationDAO';

export class DeleteReservation implements IUseCase<DeleteCommand, void> {
  constructor(
    private deleteDao: DeleteReservationDAO,
    private getDao: GetReservationDAO,
  ) {}

  async execute(request: DeleteCommand): Promise<void> {
    const entity = await this.getDao.get(request.id);
    if (!entity) {
      throw new EntityNotFoundError('Reservation', request.id);
    }
    entity.delete();
    await this.deleteDao.delete(entity);
  }
}
