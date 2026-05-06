import {Season} from '../Season';

export interface DeleteSeasonDAO {
  delete(entity: Season): Promise<void>;
}
