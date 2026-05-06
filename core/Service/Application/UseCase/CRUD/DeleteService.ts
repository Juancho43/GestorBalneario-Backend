import {GetServiceDAO} from '../../../Model/DAO/GetServiceDAO';
import {IUseCase} from '../../../../common/Application/IUseCase';
import {DeleteCommand} from '../../../../common/Application/DeleteCommand';
import {DeleteServiceDAO} from '../../../Model/DAO/DeleteServiceDAO';
import {EntityNotFoundError} from '../../../../common/Model/Errors/EntityNotFound';

export class DeleteService implements IUseCase<DeleteCommand, void> {
  constructor(
    private deleteDao: DeleteServiceDAO,
    private getDao: GetServiceDAO,
  ) {}

  async execute(request: DeleteCommand): Promise<void> {
    const entity = await this.getDao.get(request.id);
    if (!entity) {
      throw new EntityNotFoundError('Service', request.id);
    }
    entity.delete();
    await this.deleteDao.delete(entity);
  }
}
