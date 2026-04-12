import { IUseCase } from '../../../../common/Application/IUseCase';
import { DeleteCommand } from '../../../../common/Application/DeleteCommand';
import { DeleteShadowDAO } from '../../../Model/DAO/DeleteShadowDAO';
import { GetShadowDAO } from '../../../Model/DAO/GetShadowDAO';
import { EntityNotFoundError } from '../../../../common/Model/Errors/EntityNotFound';

export class DeleteShadow implements IUseCase<DeleteCommand, void> {
  constructor(
    private deleteDao: DeleteShadowDAO,
    private getDao: GetShadowDAO,
  ) {}

  async execute(request: DeleteCommand): Promise<void> {
    const entity = await this.getDao.get(request.id);
    if (!entity) {
      throw new EntityNotFoundError('Shadow', request.id);
    }
    entity.delete();
    await this.deleteDao.delete(entity);
  }
}
