import {ClientSearchQuery} from '../Queries/ClientSearchQuery';
import {IUseCase} from '../../../common/Application/IUseCase';
import {ClientResponse} from '../DTO/ClientResponse';
import {ClientSearcherDAO} from '../Interfaces/ClientSearcherDAO';

export class ClientSearch implements IUseCase<
  ClientSearchQuery,
  ClientResponse[]
> {
  constructor(private persistence: ClientSearcherDAO) {}

  execute(request: ClientSearchQuery): Promise<ClientResponse[]> {
    return this.persistence.search(request);
  }
}
