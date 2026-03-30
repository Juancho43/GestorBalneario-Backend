import {Client} from "../Client";
import {GetClientsQuery} from "../../Application/Queries/GetClientsQuery";

export interface GetClientsDAO{
    get(query: GetClientsQuery): Promise<Client[]>;
}