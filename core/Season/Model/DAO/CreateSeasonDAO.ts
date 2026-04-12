import { Season } from '../Season';

export interface CreateSeasonDAO {
  save(season: Season): Promise<void>;
}
