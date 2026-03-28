import {Client} from "../Client";

export interface GetClientsInvoicesDAO{
    get(clientId: string): Promise<Client | null>;
}