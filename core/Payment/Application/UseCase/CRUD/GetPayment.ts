import { IUseCase } from '../../../../common/Application/IUseCase';
import { GetByIdQuery } from '../../../../common/Application/GetByIdQuery';
import { EntityNotFoundError } from '../../../../common/Model/Errors/EntityNotFound';
import { GetPaymentDAO } from '../../../Model/DAO/GetPaymentDAO';
import { Payment } from '../../../Model/Payment';

export class GetPayment implements IUseCase<GetByIdQuery, Payment> {
  constructor(private dao: GetPaymentDAO) {}
  async execute(request: GetByIdQuery): Promise<Payment> {
    const entity = await this.dao.get(request.id);
    if (!entity) {
      throw new EntityNotFoundError(Payment.name, request.id);
    }
    return entity;
  }
}
