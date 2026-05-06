import {IUseCase} from '../../../../common/Application/IUseCase';
import {DeleteCommand} from '../../../../common/Application/DeleteCommand';
import {DeleteClientDAO} from '../../../Model/DAO/DeleteClientDAO';
import {GetClientDAO} from '../../../Model/DAO/GetClientDAO';
import {EntityNotFoundError} from '../../../../common/Model/Errors/EntityNotFound';

export class DeleteClient implements IUseCase<DeleteCommand, void> {
  constructor(
    private deleteDao: DeleteClientDAO,
    private getDao: GetClientDAO,
  ) {}

  async execute(request: DeleteCommand): Promise<void> {
    const entity = await this.getDao.get(request.id);
    if (!entity) {
      throw new EntityNotFoundError('Client', request.id);
    }
    entity.delete();
    await this.deleteDao.delete(entity);
  }
}
