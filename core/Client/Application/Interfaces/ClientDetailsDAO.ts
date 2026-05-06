import {ClientDetailsDTO} from '../DTO/ClientDetailsDTO';
import {ClientDetailQuery} from '../Queries/ClientDetailQuery';

export interface ClientDetailsDAO {
  get(query: ClientDetailQuery): Promise<ClientDetailsDTO>;
}
