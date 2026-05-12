import {SeasonServiceDTO} from '../DTO/SeasonServiceDTO';
import {GetSeasonEntityQuery} from '../Queries/GetSeasonEntityQuery';
import {GetSeasonServicesQuery} from "../Queries/GetSeasonServicesQuery";

export interface SeasonServiceDAO {
  get(query: GetSeasonServicesQuery): Promise<SeasonServiceDTO>;
}
