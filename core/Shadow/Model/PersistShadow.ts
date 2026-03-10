import {Shadow} from "./Shadow";

export interface PersistShadow{
    save(shadow: Shadow): void;
}