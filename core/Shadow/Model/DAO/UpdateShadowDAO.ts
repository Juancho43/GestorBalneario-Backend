import {Shadow} from "../Shadow";

export interface UpdateShadowDAO{
    update(shadow: Shadow): Promise<boolean>;
}