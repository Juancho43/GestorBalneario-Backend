import {IUseCase} from '../../../../common/Application/IUseCase';
import {Service} from '../../../Model/Service';
import {GetServiceDAO} from '../../../Model/DAO/GetServiceDAO';
import {GetByIdQuery} from '../../../../common/Application/GetByIdQuery';
import {EntityNotFoundError} from '../../../../common/Model/Errors/EntityNotFound';

export class GetService implements IUseCase<GetByIdQuery, Service> {
  constructor(private dao: GetServiceDAO) {}
  async execute(request: GetByIdQuery): Promise<Service> {
    const entity = await this.dao.get(request.id);
    if (!entity) {
      throw new EntityNotFoundError(Service.name, request.id);
    }
    return entity;
  }
}
