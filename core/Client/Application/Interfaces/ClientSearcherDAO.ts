import {ClientSearchQuery} from '../Queries/ClientSearchQuery';
import {ClientResponse} from '../DTO/ClientResponse';

export interface ClientSearcherDAO {
  search(query: ClientSearchQuery): Promise<ClientResponse[]>;
}
