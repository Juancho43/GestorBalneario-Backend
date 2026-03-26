import {Season} from "../Season";

export interface CreateSeasonDAO {
    create(season: Season): Promise<void>;
}