import {ClientDetailsDTO} from "../DTO/ClientDetailsDTO";
import {GetClientQuery} from "../Queries/GetClientQuery";

export interface ClientDetailsDAO{
    get(query: GetClientQuery): Promise<ClientDetailsDTO>;
}