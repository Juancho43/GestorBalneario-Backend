import {SeasonServiceDTO} from "../DTO/SeasonServiceDTO";
import {GetSeasonServicesQuery} from "../Queries/GetSeasonServicesQuery";

export interface SeasonServiceDAO {
    get(query: GetSeasonServicesQuery): Promise<SeasonServiceDTO>;
}