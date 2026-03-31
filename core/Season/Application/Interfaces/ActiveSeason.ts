import {Season} from "../../Model/Season";

export interface ActiveSeason{
    get(): Promise<Season>
}