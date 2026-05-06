import {DeleteCommand} from '../../../../common/Application/DeleteCommand';
import {IUseCase} from '../../../../common/Application/IUseCase';
import {GetInvoiceDAO} from '../../../Model/DAO/GetInvoiceDAO';
import {EntityNotFoundError} from '../../../../common/Model/Errors/EntityNotFound';
import {DeleteInvoiceDAO} from '../../../Model/DAO/DeleteInvoiceDAO';

export class DeleteInvoice implements IUseCase<DeleteCommand, void> {
  constructor(
    private deleteDao: DeleteInvoiceDAO,
    private getDao: GetInvoiceDAO,
  ) {}

  async execute(request: DeleteCommand): Promise<void> {
    const entity = await this.getDao.get(request.id);
    if (!entity) {
      throw new EntityNotFoundError('Invoice', request.id);
    }
    entity.delete();
    await this.deleteDao.delete(entity);
  }
}
