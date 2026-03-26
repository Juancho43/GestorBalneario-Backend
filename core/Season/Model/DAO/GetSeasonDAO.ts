import {Season} from "../Season";

export interface GetSeasonDAO{
    get(id:string): Promise<Season | null>;
}