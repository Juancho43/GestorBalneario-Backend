import {Shadow} from "../Shadow";

export interface CreateShadowDAO{
    save(shadow: Shadow): Promise<void>;
}