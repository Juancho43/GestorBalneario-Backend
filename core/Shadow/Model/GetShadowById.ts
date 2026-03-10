import {Shadow} from "./Shadow";

export interface GetShadowById{
    get(id: string): Promise<Shadow | null>;
}