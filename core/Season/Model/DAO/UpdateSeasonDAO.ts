import {Season} from '../Season';

export interface UpdateSeasonDAO {
  update(entity: Season): Promise<void>;
}
