import { IUseCase } from '../../../../common/Application/IUseCase';
import { DeleteCommand } from '../../../../common/Application/DeleteCommand';
import { GetSeasonDAO } from '../../../Model/DAO/GetSeasonDAO';
import { EntityNotFoundError } from '../../../../common/Model/Errors/EntityNotFound';
import { DeleteSeasonDAO } from '../../../Model/DAO/DeleteSeasonDAO';

export class DeleteSeason implements IUseCase<DeleteCommand, void> {
  constructor(
    private deleteDao: DeleteSeasonDAO,
    private getDao: GetSeasonDAO,
  ) {}

  async execute(request: DeleteCommand): Promise<void> {
    const entity = await this.getDao.get(request.id);
    if (!entity) {
      throw new EntityNotFoundError('Season', request.id);
    }
    entity.delete();
    await this.deleteDao.delete(entity);
  }
}
