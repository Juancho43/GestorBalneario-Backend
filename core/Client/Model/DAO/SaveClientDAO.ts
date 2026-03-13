import {Client} from "../Client";

export interface SaveClientDAO{
    save(client: Client): Promise<void>;
}