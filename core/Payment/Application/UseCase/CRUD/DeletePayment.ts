import {IUseCase} from '../../../../common/Application/IUseCase';
import {DeleteCommand} from '../../../../common/Application/DeleteCommand';
import {DeletePaymentDAO} from '../../../Model/DAO/DeletePaymentDAO';
import {GetPaymentDAO} from '../../../Model/DAO/GetPaymentDAO';
import {EntityNotFoundError} from '../../../../common/Model/Errors/EntityNotFound';

export class DeletePayment implements IUseCase<DeleteCommand, void> {
  constructor(
    private deleteDao: DeletePaymentDAO,
    private getDao: GetPaymentDAO,
  ) {}

  async execute(request: DeleteCommand): Promise<void> {
    const entity = await this.getDao.get(request.id);
    if (!entity) {
      throw new EntityNotFoundError('Payment', request.id);
    }
    entity.delete();
    await this.deleteDao.delete(entity);
  }
}
