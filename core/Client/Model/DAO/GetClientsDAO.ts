import { Client } from '../Client';
import { GetClientsQuery } from '../../Application/Queries/GetClientsQuery';
import {PaginatedQuery} from "../../../common/Application/PaginatedQuery";

export interface GetClientsDAO {
  get(query: PaginatedQuery): Promise<Client[]>;
}
