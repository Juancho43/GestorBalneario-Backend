import {SeasonResponse} from '../DTO/SeasonResponse';

export interface GetActiveSeasonDAO {
  get(): Promise<SeasonResponse>;
}
