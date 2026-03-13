import {Shadow} from "./Shadow";
import {GetClientsQuery} from "../../Client/Application/DTO/GetClientsQuery";

export interface GetCurrentShadows {
    getCurrentShadows(): Promise<Shadow[]>;
}