import {Client} from "../Client";

export interface GetClientDAO{
    get(id: string): Promise<Client | null>;
}