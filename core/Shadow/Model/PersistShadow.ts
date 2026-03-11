import {Shadow} from "./Shadow";

export interface PersistShadow{
    update(shadow: Shadow): Promise<boolean>;
    save(shadow: Shadow): Promise<void>;
}