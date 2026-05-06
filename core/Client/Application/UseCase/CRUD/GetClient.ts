import {IUseCase} from '../../../../common/Application/IUseCase';
import {Client} from '../../../Model/Client';
import {GetClientDAO} from '../../../Model/DAO/GetClientDAO';
import {GetByIdQuery} from '../../../../common/Application/GetByIdQuery';
import {EntityNotFoundError} from '../../../../common/Model/Errors/EntityNotFound';

export class GetClient implements IUseCase<GetByIdQuery, Client> {
  constructor(private dao: GetClientDAO) {}
  async execute(request: GetByIdQuery): Promise<Client> {
    const entity = await this.dao.get(request.id);
    if (!entity) {
      throw new EntityNotFoundError(Client.name, request.id);
    }
    return entity;
  }
}
