import {Shadow} from "../Shadow";

export interface GetShadowListDAO {
    getCurrentShadows(): Promise<Shadow[]>;
}