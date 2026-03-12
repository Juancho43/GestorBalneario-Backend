import {Client} from "../Client";
import {GetClientsQuery} from "../../Application/DTO/GetClientsQuery";

export interface GetClientsDAO{
    get(query: GetClientsQuery): Promise<Client[]>;
}