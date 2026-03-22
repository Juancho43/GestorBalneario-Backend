import {Shadow} from "../Shadow";

export interface GetShadowDAO {
    get(id: string): Promise<Shadow | null>;
}