import {SeasonServiceDTO} from '../DTO/SeasonServiceDTO';
import {GetSeasonEntityQuery} from '../Queries/GetSeasonEntityQuery';

export interface SeasonServiceDAO {
  get(query: GetSeasonEntityQuery): Promise<SeasonServiceDTO>;
}
