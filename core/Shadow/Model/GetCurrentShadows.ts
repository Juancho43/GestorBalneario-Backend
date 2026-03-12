import {Shadow} from "./Shadow";

export interface GetCurrentShadows {
    getCurrentShadows(): Promise<Shadow[]>;
}