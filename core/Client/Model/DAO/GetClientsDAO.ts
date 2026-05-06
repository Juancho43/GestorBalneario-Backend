import {Client} from '../Client';
import {PaginatedQuery} from '../../../common/Application/PaginatedQuery';

export interface GetClientsDAO {
  get(query: PaginatedQuery): Promise<Client[]>;
}
