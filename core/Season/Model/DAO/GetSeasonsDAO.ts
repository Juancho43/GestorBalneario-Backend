import {Season} from "../Season";

export interface GetSeasonsDAO{
    get(): Promise<Season[]>;
}