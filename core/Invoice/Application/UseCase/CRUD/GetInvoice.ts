import {IUseCase} from '../../../../common/Application/IUseCase';
import {GetByIdQuery} from '../../../../common/Application/GetByIdQuery';
import {EntityNotFoundError} from '../../../../common/Model/Errors/EntityNotFound';
import {Invoice} from '../../../Model/Invoice';
import {GetInvoiceDAO} from '../../../Model/DAO/GetInvoiceDAO';

export class GetInvoice implements IUseCase<GetByIdQuery, Invoice> {
  constructor(private dao: GetInvoiceDAO) {}
  async execute(request: GetByIdQuery): Promise<Invoice> {
    const entity = await this.dao.get(request.id);
    if (!entity) {
      throw new EntityNotFoundError(Invoice.name, request.id);
    }
    return entity;
  }
}
