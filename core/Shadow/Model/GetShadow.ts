import {Shadow} from "./Shadow";

export interface GetShadow {
    get(id: string): Promise<Shadow | null>;
}