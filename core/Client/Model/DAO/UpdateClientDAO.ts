import {Client} from "../Client";

export interface UpdateClientDAO{
    update(client: Client): Promise<boolean>;
}