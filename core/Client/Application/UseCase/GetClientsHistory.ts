import {PaginatedQuery} from '../../../common/Application/PaginatedQuery';
import {GetClientsDAO} from '../../Model/DAO/GetClientsDAO';
import {IUseCase} from '../../../common/Application/IUseCase';
import {Client} from '../../Model/Client';

export class GetClientsHistory implements IUseCase<PaginatedQuery, Client[]> {
  constructor(private persistance: GetClientsDAO) {}

  async execute(request: PaginatedQuery): Promise<Client[]> {
    return this.persistance.get(request);
  }
}
